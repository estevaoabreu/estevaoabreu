import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const { data: categories, error: catsError } = await supabase
      .from('categories')
      .select('*');

    if (catsError) {
      console.error('Error fetching categories:', catsError);
      throw error(500, 'Failed to fetch categories');
    }

    const categoriesWithProjectsAndContent = await Promise.all(
      categories.map(async (category) => {
        const { data: projects, error: projsError } = await supabase
          .from('projects')
          .select('*')
          .eq('categories_name', category.name)
          .order('title', { ascending: true });

        if (projsError) {
          console.error(`Error fetching projects for category ${category.name}:`, projsError);
          return { ...category, projects: [] };
        }

        const projectsWithContent = await Promise.all(
          projects.map(async (project) => {
            const { data: content, error: contentError } = await supabase
              .from('content')
              .select('*')
              .eq('projects_id', project.id)
              .order('position');

            if (contentError) {
              console.error(`Error fetching content for project ${project.id}:`, contentError);
              return { ...project, content: [] };
            }

            return { ...project, content };
          })
        );

        return { ...category, projects: projectsWithContent };
      })
    );

    return {
      categories: categoriesWithProjectsAndContent
    };
  } catch (err) {
    console.error('An unexpected error occurred in the load function:', err);
    if (err.status) throw err;
    throw error(500, 'An unexpected error occurred while fetching data');
  }
}
