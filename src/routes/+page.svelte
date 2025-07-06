<script>
	export let data;
	import ProjectCard from './projectcard.svelte';
	import { onMount } from 'svelte';
	import { setupSectionInteractions } from './section.js';
	import { loadAnimation } from './load.js';
	onMount(() => {
		loadAnimation();
		setupSectionInteractions();
	});
</script>

<svelte:head>
	<title>Estêvão Abreu - Design Portfolio</title>
	<link href="css/index.css" rel="stylesheet" type="text/css" />
	<meta name="description" content="My name is Estêvão Abreu, and I a multimedia designer from Coimbra, Portugal. This is my portfolio." />
</svelte:head>

<div class="intro">
	<p class="hello begin">HELLO, MY NAME IS</p>
	<h1 class="estevao">
		<span class="begin">Est</span><span id="circunflexo">ê</span><span class="begin">vãO</span>
	</h1>
	<p class="about begin">
		I am a multimedia designer, fascinated by audiovisual, innovation and creative coding. I believe
		that the future of design lies in mixing different mediums and technologies. Get to know my work
		:)
	</p>
</div>

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
