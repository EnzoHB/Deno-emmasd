<svelte:options accessors={true} />

<script>

    import { createEventDispatcher } from 'svelte'

    let dispatch = createEventDispatcher();
    
    export let palette = {"colors":{"white":"white","#0376A8":"#0376A8","black":"black"},"strokes":{"black":"black"}}

    function handleClick(event) {
        dispatch("click", { event, palette })
    };

    function press(event) {
        // Handle acessibility later
    };

</script>

<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
	 <circle on:click={handleClick} cx="92" cy="142" r="24" fill={palette.colors["white"]} stroke={palette.strokes["black"]} stroke-width="2"/>
	 <circle on:click={handleClick} cx="92" cy="142" r="20" fill={palette.colors["#0376A8"]}/>
	 <ellipse on:click={handleClick} cx="92" cy="142.5" rx="15" ry="15.5" fill={palette.colors["black"]}/>
	 <circle on:click={handleClick} cx="85.5" cy="133.5" r="6.5" fill={palette.colors["white"]}/>
	 <circle on:click={handleClick} cx="97" cy="148" r="3" fill={palette.colors["white"]}/>
	 <circle on:click={handleClick} cx="166" cy="142" r="24" fill={palette.colors["white"]} stroke={palette.strokes["black"]} stroke-width="2"/>
	 <circle on:click={handleClick} cx="166" cy="142" r="20" fill={palette.colors["#0376A8"]}/>
	 <ellipse on:click={handleClick} cx="166" cy="142.5" rx="15" ry="15.5" fill={palette.colors["black"]}/>
	 <circle on:click={handleClick} cx="159.5" cy="133.5" r="6.5" fill={palette.colors["white"]}/>
	 <circle on:click={handleClick} cx="171" cy="148" r="3" fill={palette.colors["white"]}/>
	 <path on:click={handleClick} d="M146.5 115.871C156.728 104.033 175.277 104.053 187 115.871M71 115.871C81.2282 104.033 99.7772 104.053 111.5 115.871" stroke={palette.strokes["black"]} stroke-width="3" stroke-linecap="round"/>
</svg>