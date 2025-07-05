<script>
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import Footer from './footer.svelte';

	// Injects Vercel Analytics only in production
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<Footer />
