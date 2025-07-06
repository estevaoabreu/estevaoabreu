import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const { data: categories, error: dbError } = await supabase
    .from('categories')
    .select(`
      name,
      projects (
        id,
        title,
        tagline
      )
    `)
    .order('title', { foreignTable: 'projects', ascending: true });

  if (dbError) {
    console.error('Error fetching categories and projects:', dbError);
    throw error(500, 'Failed to fetch portfolio data');
  }

  return {
    categories: categories
  };
}