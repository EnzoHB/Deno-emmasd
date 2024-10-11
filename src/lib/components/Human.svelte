<script>
	import { createEventDispatcher, onMount } from 'svelte';
    import { beforeUpdate } from 'svelte';

    let dispatch = createEventDispatcher()

    import resources from './People';

    export let zoom = 1
    
    export let gender = "male"
    export let hair = 1
    export let body = 1
    export let eye = 1

    export let hairPalette = {"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}}
    export let bodyPalette = {"colors":{"#FE9574":"#FE9574"},"strokes":{"black":"black"}}
    export let eyePalette = {"colors":{"white":"white","#0376A8":"#0376A8","black":"black"},"strokes":{"black":"black"}}

    let Hair = computeHair(gender, hair);
    let Eyes = computeEyes(eye); 
    let Body = computeBody(body); 

    function computeEyes(eye) {
       return resources.Eyes[eye]
    }

    function computeBody(body) {
        return resources.Bodies[body]
    };

    function computeHair(gender, hair) {

        if (gender == 'male') {
            return resources.Male[hair] 
        }

        if (gender == 'female') {
            return resources.Female[hair]
        }
    }


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

    let container

    onMount(() => {

        // After mounting all the components, in order to correctly dispatch the events
        // when the user clicks the respective body part, like the hair or the skin,
        // we need to render all of them in a single svg. That is because the click
        // listeners must be appended in the paths 

        var xmlns = "http://www.w3.org/2000/svg";
        var width = 256;
        var height = 256;

        var svgElement = document.createElementNS(xmlns, "svg");
        
        svgElement.setAttributeNS(null, "viewBox", "0 0 " + width + " " + height);
        svgElement.setAttributeNS(null, "width", width);
        svgElement.setAttributeNS(null, "height", height);
        svgElement.setAttributeNS(null, "fill", 'none');


        for (let svg of container.getElementsByTagName('svg')) {
            let children = svg.childNodes;
            children = Array.from(children)

            for (let child of children) {
                svgElement.appendChild(child)
            }
        }

        container.innerHTML = ''; 
        container.appendChild(svgElement)
    })

</script>

<!-- THE BODY HAS TO BE DRAWN BEFORE THE EYES. THAT IS BECAUSE THE CODE
GETS THE PATHS OF THE COMPONENTS IN THE ORDER THEY ARE DRAWN. -->


<div style="relative aspect-ratio: 1/1; width: 256px; height: 256px; zoom: {zoom}">
    <div class='relative w-full h-full bg-green-500' bind:this={container}>
        <div class='absolute'>
            <svelte:component this={Hair} on:click={handleHairClick} palette={hairPalette}/>
        </div>
        <div class='absolute'>
            <svelte:component this={Body} on:click={handleBodyClick} palette={bodyPalette}/>
        </div>
        <div class='absolute'>
            <svelte:component this={Eyes} on:click={handleEyeClick} palette={eyePalette}/>
        </div>
    </div>
</div>
