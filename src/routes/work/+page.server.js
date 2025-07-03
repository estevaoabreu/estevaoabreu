import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function load({ url }) {
  const projectId = url.searchParams.get('project');
  if (!projectId) {
    throw new Error('Missing project ID');
  }

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (projectError || !project) {
    throw new Error(`Project "${projectId}" not found`);
  }

  const { data: content, error: contentError } = await supabase
    .from('content')
    .select('*')
    .eq('projects_id', projectId)
    .order('position');

  if (contentError) {
    throw new Error('Failed to load content');
  }

  return {
    project,
    content
  };
}