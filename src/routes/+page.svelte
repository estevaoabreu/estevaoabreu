<script>
	import Footer from "./footer.svelte";
	export let data;
	import ProjectCard from "./projectcard.svelte";
	import { onMount } from "svelte";
	import { setupSectionInteractions } from "./section.js";
	import { loadAnimation } from "./load.js";
	onMount(() => {
		loadAnimation();
		setupSectionInteractions();
	});
</script>

<link href="css/index.css" rel="stylesheet" type="text/css" />
<div class="intro">
	<p class="hello begin">HELLO, MY NAME IS</p>
	<h1 class="estevao">
		<span class="begin">Est</span><span id="circunflexo">ê</span><span class="begin">vãO</span>
	</h1>
	<p class="about begin">
		I am a multimedia designer, fascinated by audiovisual, innovation and
		creative coding. I believe that the future of design lies in mixing
		different mediums and technologies. Get to know my work :)
	</p>
</div>
<main>
	{#each data.categories as category}
		<section>
			<p><span>+</span> {category.name}</p>

			<div class="works hidden">
				{#each category.projects as project}
					<ProjectCard
						href={"/work?project=" + project.id}
						title={project.title}
						tagline={project.tagline}
						src={project.id}
					/>
				{/each}
			</div>
		</section>
	{/each}
</main>
<Footer />
