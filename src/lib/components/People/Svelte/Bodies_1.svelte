<svelte:options accessors={true} />

<script>

    import { createEventDispatcher } from 'svelte'

    let dispatch = createEventDispatcher();
    
    export let palette = {"colors":{"#FE9574":"#FE9574"},"strokes":{"black":"black"}}

    function handleClick(event) {
        dispatch("click", { event, palette })
    };

    function press(event) {
        // Handle acessibility later
    };

</script>

<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
	 <rect on:click={handleClick} x="53.5" y="89.5" width="150" height="88" rx="8.5" fill={palette.colors["#FE9574"]} stroke={palette.strokes["black"]} stroke-width="3"/>
</svg>