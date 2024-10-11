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
	 <path on:click={handleClick} d="M119.507 79.5H213.5V64.0174L42.5 45.6696V62.6697V72.1829V79.5H119.507Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
</svg>