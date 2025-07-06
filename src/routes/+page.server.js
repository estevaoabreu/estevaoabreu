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

  const pageMeta = {
    title: 'Estêvão Abreu - Design Portfolio',
    description: 'My name is Estêvão Abreu, and I am a multimedia designer from Coimbra, Portugal. This is my portfolio.'
  };

  return {
    categories: categories,
    pageMeta: pageMeta
  };
}