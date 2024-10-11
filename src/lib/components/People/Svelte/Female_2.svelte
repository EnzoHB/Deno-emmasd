<svelte:options accessors={true} />

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
	 <circle on:click={handleClick} cx="36.5" cy="145.5" r="9" transform="rotate(-90 36.5 145.5)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <circle on:click={handleClick} cx="36.5435" cy="134.5" r="9" transform="rotate(-90 36.5435 134.5)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <circle on:click={handleClick} cx="36.5829" cy="124.5" r="9" transform="rotate(-90 36.5829 124.5)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <circle on:click={handleClick} cx="36.6223" cy="114.5" r="9" transform="rotate(-90 36.6223 114.5)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <circle on:click={handleClick} cx="36.6619" cy="104.5" r="9" transform="rotate(-90 36.6619 104.5)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <circle on:click={handleClick} cx="36.7052" cy="93.4999" r="9" transform="rotate(-90 36.7052 93.4999)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <circle on:click={handleClick} cx="36.7487" cy="82.5" r="9" transform="rotate(-90 36.7487 82.5)" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
	 <path on:click={handleClick} d="M118.615 60.5033L205.5 66.4016V70.2414V82.5H118.617H27.5V81.7069V66.406L118.615 60.5033Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
</svg>