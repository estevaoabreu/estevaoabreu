<script>
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import Footer from './footer.svelte';
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<Footer />
