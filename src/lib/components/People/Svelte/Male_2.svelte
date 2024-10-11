
<script>

    import { createEventDispatcher } from 'svelte'

    let dispatch = createEventDispatcher();

    export let palette = {"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}}

    function handleClick(event) {
        dispatch("click", { event, palette })
    };

    function press(event) {
        // Handle acessibility later
    };

</script>

<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
	 <path on:click={handleClick} d="M56.8786 80.5H48.5V55.217L55.9091 47.1969L63.5 55.2269V68.8347V80.5H56.8786Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M77.3298 80.5H69.5V55.1925L76.4152 47.2668L83.5 55.2023V68.8347V80.5H77.3298Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M119.879 80.5H111.5V55.217L118.909 47.1969L126.5 55.2269V68.8347V80.5H119.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M143.879 80.5H135.5V55.217L142.909 47.1969L150.5 55.2269V68.8347V80.5H143.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M168.33 80.5H160.5V55.1925L167.415 47.2668L174.5 55.2023V68.8347V80.5H168.33Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M192.879 80.5H184.5V55.217L191.909 47.1969L199.5 55.2269V68.8347V80.5H192.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M96.8786 80.5H88.5V55.217L95.9091 47.1969L103.5 55.2269V68.8347V80.5H96.8786Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M66.8786 80.5H58.5V55.217L65.9091 47.1969L73.5 55.2269V68.8347V80.5H66.8786Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M87.8786 80.5H79.5V55.217L86.9091 47.1969L94.5 55.2269V68.8347V80.5H87.8786Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M129.879 80.5H121.5V55.217L128.909 47.1969L136.5 55.2269V68.8347V80.5H129.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M153.879 80.5H145.5V55.217L152.909 47.1969L160.5 55.2269V68.8347V80.5H153.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M178.879 80.5H170.5V55.217L177.909 47.1969L185.5 55.2269V68.8347V80.5H178.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M202.879 80.5H194.5V55.217L201.909 47.1969L209.5 55.2269V68.8347V80.5H202.879Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M107.33 80.5H99.5V55.1925L106.415 47.2668L113.5 55.2023V68.8347V80.5H107.33Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
</svg>