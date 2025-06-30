<script>
	import Footer from '../footer.svelte';
	import { setupSectionInteractions } from './gallery.js';
	import { onMount } from 'svelte';
	onMount(() => {
		setupSectionInteractions();
	});
	export let data;
	$: formattedTags =
		data?.project?.tags
			?.split(',')
			?.map((tag) => `<li>${tag.trim()}</li>`)
			.join('') || '';
	$: formattedTools =
		data?.project?.tools
			?.split(',')
			?.map((tool) => `<li>${tool.trim()}</li>`)
			.join('') || '';

	let sections = [];
	let currentArray = [];

	if (data && data.content && Array.isArray(data.content)) {
		for (const item of data.content) {
			if (item.col === 0 && currentArray.length > 0) {
				sections.push(currentArray);
				currentArray = [item];
			} else {
				currentArray.push(item);
			}
		}

		if (currentArray.length > 0) {
			sections.push(currentArray);
		}
	}
</script>

<link href="css/work.css" rel="stylesheet" type="text/css" />
<div class="titlediv">
	<h1 class="title">{data.project.title}</h1>
</div>
<div class="details">
	<div class="textleft">
		<div class="descandlink">
			<p class="description">
				{data.project.description}
			</p>
			{#if data.project.link != null}
				<a href={data.project.link} class="link" target="_blank"> Click here to see more. </a>
			{/if}
		</div>
	</div>
	<div class="textright">
		<div class="collabandtags">
			{#if data.project.collaborators != null}
				<p class="collaborators">
					Collaborators: {data.project.collaborators}<br /><br />
				</p>
			{/if}
			<div class="tagsandtools">
				<div class="tags">
					<ul>
						<li>
							<b>{data.project.placedate}</b>
						</li>
						{@html formattedTags}
					</ul>
				</div>
				{#if data.project.tools != null}
					<div class="tools">
						<ul>
							<li>
								<b>Tools used</b>
							</li>
							{@html formattedTools}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
<main>
	{#each sections as section}
		{#each section as content}
			{#if content.col == 0}
				{#if content.type == 'img'}
					<img src={'imgs/' + content.projects_id + '/' + content.content} alt={content.content} />
				{:else if content.type == 'video'}
					<video src={'imgs/' + content.projects_id + '/' + content.content} controls></video>
				{/if}
			{/if}
		{/each}
		<div class="cols">
			<div class="colleft">
				{#each section as content}
					{#if content.col == 1}
						{#if content.type == 'img'}
							<img
								src={'imgs/' + content.projects_id + '/' + content.content}
								alt={content.content}
							/>
						{:else if content.type == 'p'}
							<p>
								{content.content}
							</p>
						{:else if content.type == 'video'}
							<video src={'imgs/' + content.projects_id + '/' + content.content} controls></video>
						{/if}
					{/if}
				{/each}
			</div>
			<div class="colright">
				{#each section as content}
					{#if content.col == 2}
						{#if content.type == 'img'}
							<img
								src={'imgs/' + content.projects_id + '/' + content.content}
								alt={content.content}
							/>
						{:else if content.type == 'p'}
							<p>
								{content.content}
							</p>
						{:else if content.type == 'video'}
							<video src={'imgs/' + content.projects_id + '/' + content.content} controls></video>
						{/if}
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</main>
<div id="lightbox" class="lightbox hidden">
	<span class="close-button">&times;</span>
	<img id="lightbox-image" src="" alt="Full-size Image" />
	<button class="prev-button">&lt;</button>
	<button class="next-button">&gt;</button>
</div>
<Footer />
