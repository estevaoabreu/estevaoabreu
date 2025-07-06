import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { projectId } = params;

  const { data: project, error: dbError } = await supabase
    .from('projects')
    .select(`
      *,
      content (
        *
      )
    `)
    .eq('id', projectId)
    .order('position', { foreignTable: 'content', ascending: true })
    .single();

  if (dbError || !project) {
    throw error(404, 'Project not found');
  }

  const pageMeta = {
    title: `${project.title} - Estêvão Abreu`,
    description: project.tagline || 'A project by Estêvão Abreu, multimedia designer from Coimbra, Portugal.'
  };

  return {
    project: project,
    pageMeta: pageMeta
  };
}

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const { data: projects } = await supabase.from('projects').select('id');
  return projects?.map((p) => ({ projectId: p.id })) || [];
}

export const prerender = true;
