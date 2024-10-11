<script>
	import { onMount } from "svelte";

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

<div class='relative w-full h-full' bind:this={container}>
    <slot></slot>
</div>
