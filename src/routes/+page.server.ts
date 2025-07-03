import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { error } from '@sveltejs/kit';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

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
    console.error('Unexpected error:', err);
    throw error(500, 'Failed to fetch data');
  }
}