import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from 'svelte-adapter-deno';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},

	// Disable accessibility warnings 
	onwarn: (warning, handler) => {
		if (warning.code.includes("a11y")) return;
		handler(warning);
	  },
};
export default config;
