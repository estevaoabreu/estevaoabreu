import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { projectId } = params;

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (projectError || !project) {
    throw error(404, `Project not found`);
  }

  const { data: content, error: contentError } = await supabase
    .from('content')
    .select('*')
    .eq('projects_id', projectId)
    .order('position');

  if (contentError) {
    throw error(500, 'Failed to load content for the project');
  }

  return {
    project,
    content
  };
}
