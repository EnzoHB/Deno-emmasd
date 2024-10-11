<script>

	import { onMount } from "svelte";
    import Span from "./Span.svelte";

    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher()

    export let palette
    export let pointerEvent
    
    let width = 150
    let height = 100

    let div;
    let input;

    $: colors = Object.entries(palette.colors)
    $: strokes = Object.entries(palette.strokes)

    onMount(() => {

        // Passes the target of the event
        // and recursively calls the parent property
        // while checking if one of them is the above 
        // declared "div". If it reaches document, it means
        // that the element clicked wans't part of the color
        // picker and then we fire on:clickOut

        let firewall = 0

        document.addEventListener('click', assertSecond)

        function assertSecond(event) {

            // For some reason, onMount triggers this function
            // when it runs when it clearly shouldn't. I suspect 
            // that is because, when the div is created, we actually 
            // clicked on its container. Thefore, the div gets mounted
            // before the click gets sent to the document and that results
            // in the event listener catching our click outside 

            if (firewall == 0) {
                firewall++
                return
            }

            traceBack(event.target)
        }

        function traceBack(HTMLElement) {

            // We clicked outside of the div that contains the color picker
            if (HTMLElement == document.body) {
                
                // We have to remove the event listerner in order to 
                // not polute the document
                document.removeEventListener('click', assertSecond)

                // We should reset the firewall for the next call of the color picker
                // Doesn't change anything at all 
                firewall = 0

                // Propagating the click out up
                return dispatch('clickOut')
            }

            // We clicked on the div or one of their children or grandechildren and so on  
            if (HTMLElement == div) {
                // console.log('We clicked inside')
                return 
            }

            traceBack(HTMLElement.parentNode)
        };
    })

    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

    function isDark(bgColor) {

        let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : colorNameToHex(bgColor).substring(1, 7); // Added this

        let r = parseInt(color.substring(0, 2), 16); // hexToR
        let g = parseInt(color.substring(2, 4), 16); // hexToG
        let b = parseInt(color.substring(4, 6), 16); // hexToB

        let uicolors = [r / 255, g / 255, b / 255];

        let c = uicolors.map((col) => {
            if (col <= 0.03928) {
            return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return L <= 0.179;
    }

    // https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes#1573141

    function colorNameToHex(color) {
        let colors = {"aliceblue":"#f0f8ff", "white": "#FFFFFF", "antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"};

        if (typeof colors[color.toLowerCase()] != 'undefined')
            return colors[color.toLowerCase()];

        return null

    }

    // ---------------- Events ------------------------- // 

    function handleChange(event, type, key) {

        // Update inner palette
        palette[type][key] = event.target.value
        palette = palette

        // Dispatch event for parents
        dispatch('newPalette', palette)
    };

</script>


<div bind:this={div} class='absolute z-50 rounded-lg bg-white shadow-md p-2 flex flex-col gap-1 outline outline-1' style='width: {width}px; height: {height}; top: {pointerEvent.offsetY - height - 5}px; left: {pointerEvent.offsetX}px' >
    
    <div>
        <Span pt=0 pb=1>Prenchimento</Span>

        <div class='flex gap-2'>

            {#each colors as [ key, color ]}

                <!-- Create a DIV that has some rounded corners and the same background as the 
                     default fill color of the asset being selected. 
                     
                     Insert an input of type color with the default value as the same default fill color.

                     Also, set a callback so that, when it is selected, it is possible to know
                     which os the path palette[colors][key] is to be updated and propagated 
                     up.    
                -->

                <div class='text-xs rounded-md p-1 w-[22px] h-[22px] outline outline-1 ' style='background-color: {color};}'>
                    <input on:input={event => handleChange(event, 'colors', key)} type=color value={color.charAt(0) == '#'? color : colorNameToHex(color)} class='opacity-0 -translate-x-[4px] -translate-y-1 w-[22px] h-[22px]'>
                </div>

            {/each}
        </div>
    </div>

    <div class='pb-1'>
        <Span pt=2 pb=1>Contorno</Span>

        <div class='flex gap-2'>

            {#each strokes as [ key, stroke ]}

             <!-- Create a DIV that has some rounded corners and the same background as the 
                     default fill color of the asset being selected. 
                     
                     Insert an input of type color with the default value as the same default fill color.

                     Also, set a callback so that, when it is selected, it is possible to know
                     which os the path palette[colors][key] is to be updated and propagated 
                     up.    
                -->


                <div class='text-xs rounded-md p-1 w-[22px] h-[22px]' style='background-color: {stroke};}'>
                    <input on:input={event => handleChange(event, 'strokes', key)} type=color value={stroke.charAt(0) == '#'? stroke : colorNameToHex(stroke)} class='opacity-0 -translate-x-[4px] -translate-y-1 w-[22px] h-[22px]'>
                </div>

            {/each}
        </div>
    </div>
</div>

