
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
	 <path on:click={handleClick} d="M96.1203 91H95.2597L94.8254 91.743L58.7267 153.5H45.5V77.3562L133.123 68.5084L212.5 77.3423V91H96.1203Z" fill={palette.colors["#F19138"]} stroke={palette.strokes["black"]} stroke-width="3"/>
</svg>