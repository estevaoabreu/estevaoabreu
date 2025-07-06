<script>
	export let data;
	const { pageMeta } = data;
	import ProjectCard from '../projectcard.svelte';
	import { onMount } from 'svelte';
	import { setupSectionInteractions } from '../section.js';
	onMount(() => {
		setupSectionInteractions();
	});
</script>

<svelte:head>
	<title>{pageMeta.title}</title>
	<link href="css/index.css" rel="stylesheet" type="text/css" />
	<meta name="description" content={pageMeta.description} />
</svelte:head>

<main>
	{#each data.categories as category}
		<section>
			<p><span>+</span> {category.name}</p>

			<div class="works hidden">
				{#each category.projects as project}
					<ProjectCard
						href={'/work/' + project.id}
						title={project.title}
						tagline={project.tagline}
						src={project.id}
					/>
				{/each}
			</div>
		</section>
	{/each}
</main>
