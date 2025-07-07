<script>
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import Footer from './footer.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
</script>

<slot />

<Footer />
