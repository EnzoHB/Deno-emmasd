<script>
	import { createEventDispatcher, onMount } from 'svelte';
    import SVGMerger from './SVGMerger.svelte';

    let dispatch = createEventDispatcher()

    import {resources} from './People';

    export let zoom = 1
    
    export let gender = 0
    export let hair = 1
    export let body = 1
    export let eye = 1

    export let hairPalette = gender? resources.Female[hair].defaultPalette : resources.Male[hair].defaultPalette;
    export let bodyPalette = resources.Bodies[body].defaultPalette
    export let eyePalette = resources.Eyes[eye].defaultPalette

    // ----------- Handlers -------------------- //

    function handleHairClick(event) {
        dispatch('hairClick', event.detail)
    };

    function handleBodyClick(event) {
        dispatch('bodyClick', event.detail)
    };

    function handleEyeClick(event) {
        dispatch('eyeClick', event.detail)
    }

</script>

<!-- THE BODY HAS TO BE DRAWN BEFORE THE EYES. THAT IS BECAUSE THE CODE
GETS THE PATHS OF THE COMPONENTS IN THE ORDER THEY ARE DRAWN. ALSO, THE HAIR MUST
BE DRAWN AFTER EVERYTHING, SINCE IT CAN OVERLAP BODY AND EYES IN SOME ASSETS 
-->

<div style="relative aspect-ratio: 1/1; width: 256px; height: 256px; zoom: {zoom}">

    <!-- The key logic operator unmounts and mounts evertyhing that is inside it whenever
        the expression changes. As we define gender, hair, eye and body by numbers, whenever
        one changes, their sum changes together. This comes in handy since we need the SVG Merger
        to merge the svgs assets into a single svg and this MUST be done only when the component 
        mounts  
    -->
    {#key (gender + hair + eye + body)}
        <SVGMerger>
            <div class='absolute'>
                <svelte:component this={resources.Bodies[body]} on:click={handleBodyClick} palette={bodyPalette}/>
            </div>
            <div class='absolute'>
                <svelte:component this={resources.Eyes[eye]} on:click={handleEyeClick} palette={eyePalette}/>
            </div>
            <div class='absolute'>
                <svelte:component this={gender? resources.Female[hair] : resources.Male[hair]} on:click={handleHairClick} palette={hairPalette}/>
            </div>
        </SVGMerger>
    {/key}
</div>

<!-- 
<div style="relative aspect-ratio: 1/1; width: 256px; height: 256px; zoom: {zoom}">
    <div class='relative w-full h-full bg-green-500' bind:this={container}>
        <div class='absolute'>
            <svelte:component this={Body} on:click={handleBodyClick} palette={bodyPalette}/>
        </div>
        <div class='absolute'>
            <svelte:component this={Eyes} on:click={handleEyeClick} palette={eyePalette}/>
        </div>
        <div class='absolute'>
            <svelte:component this={Hair} on:click={handleHairClick} palette={hairPalette}/>
        </div>
    </div>
</div> -->
