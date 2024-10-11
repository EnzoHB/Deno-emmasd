<script>

    import DialogSpan from "./Span.svelte";
    import Human from "./Human.svelte";
    import Header from "./Header.svelte";
	import Span from "./Span.svelte";
    import RadioText from "./RadioText.svelte";
	import FloatingColorPicker from "./FloatingColorPicker.svelte";

    let gender = 'male';
    let hair = 1;

    let hairPalette = {"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}}
    let bodyPalette = {"colors":{"#FE9574":"#FE9574"},"strokes":{"black":"black"}}
    let eyePalette = {"colors":{"white":"white","#0376A8":"#0376A8","black":"black"},"strokes":{"black":"black"}}

    // --------- Input Changes -----------------// 

    // event.detail
    function handleGenderChange({ detail: { option } }) {
        gender = option.value
    };

    function handleHairStyleChange({ detail: { option } }) {
        hair = option.value
    };

    function handleHairColorChange({detail: {option}}) {
        hairColor = option.value
    }

    function handleSkinColorChange({detail: {option}}) {
        skinColor = option.value
    }

    function handleEyeColorChange({detail: {option}}) {
        eyeColor = option.value
    }

    // ---------- Floating Color Picker  ------------- //

    let handleNewPalette = () => {} 

    let colorPickerPalette;
    let colorPickerVisible = false;
    let colorPickerEvent;

    function handleHumanClick(callback, { palette }) {

        colorPickerVisible = true
        colorPickerPalette = palette
        colorPickerEvent = event

        handleNewPalette = () => callback(palette)

    };

    function killColorPicker(event) {
        colorPickerEvent = null 
        colorPickerVisible = false
        colorPickerEvent = null
    };

</script>

<div class='relative'>
    <div class='pt-2 pb-2'>
        <span class="block text-sm font-medium text-slate-700">Avatar</span>
        <span class="block text-sm font-small text-slate-400">Clique no cabelo, na pele ou nos olhos</span>
    </div>

    <div class='relative flex gap-5 items-center'>

        <!-- The Color picker gets a palette that is going to be loaded as default as well
             as a mouse pointer event. This mouse pointer event actually comes all the way down from
             the built asset and gets propagated up through the details as { PointerEvent, palette }
             until it finally reaches handleHumanClick. This is necessary so that the floating 
             color picker knows where it has to be loaded.  

        -->
        {#if colorPickerVisible} 
            <FloatingColorPicker 

                palette={colorPickerPalette} 
                pointerEvent={colorPickerEvent} 
                
                on:newPalette={handleNewPalette} 
                on:clickOut={killColorPicker}
            />
        {/if}

        <!-- The human sends back an event called "somethingClick" which provides in its
             detail (native of svelt) field the pallete of the asset that was cliked.
             We then call the function handleHumanClick, which needs to arguments:
             A call back to be executed reactively when the pallete from the color picker changes
             and the pallete of asset that was click, that is going to be hand down to the color
             picker variables.  
        -->
            
        <Human 
            zoom=0.85 

            {hair} 
            {gender}

            {hairPalette}
            {bodyPalette}
            {eyePalette}
              
            on:eyeClick={({ detail }) => handleHumanClick(palette => eyePalette = palette, detail)}
            on:hairClick={({ detail }) => handleHumanClick(palette => hairPalette = palette, detail)}
            on:bodyClick={({ detail }) => handleHumanClick(palette => bodyPalette = palette, detail)}

        />

        <div>
            <Span>Gênero</Span>
            <RadioText 
                options={[
                    { label: 'Homem', color: '#95b8fa', value: 'male' },
                    { label: 'Mulher', color: '#fa9595', value: 'female'}
                ]}
                on:select={handleGenderChange}
            />
            <Span>Penteado</Span>
            <RadioText 
                options={[
                    { label: '1', value: '1' },
                    { label: '2',  value: '2'},
                    { label: '3',  value: '3'},
                ]}
                on:select={handleHairStyleChange}
            />
            <Span>Cabelo</Span>
            <RadioText 
                options={[
                    { label: 'Preto', color: "#241c11", value: "#241c11" },
                    { label: 'Castanho',  color: "#4f1a00", value: "#4f1a00"},
                    { label: 'Loiro',  color: "#ffb36c", value: '#F19138'},
                ]}
                on:select={handleHairColorChange}
            />
            <Span>Pele</Span>
            <RadioText 
                options={[
                    { label: 'Branco', color: "#d1d1d1", text: "#000000", value: "#d1d1d1" },
                    { label: 'Pardo',  color: "#ECB176", value: "#ECB176"},
                    { label: 'Negro',  color: "#6F4E37", value: '#6F4E37'},
                ]}
                on:select={handleHairColorChange}
            />
            <Span>Olhos</Span>
            <RadioText 
                options={[
                    { label: 'Azul', color: "#2e536f", value: "#2e536f" },
                    { label: 'Verde',  color: "#3d671d", value: "#3d671d"},
                    { label: 'Castanho',  color: "#634e34", value: '#634e34'},
                ]}
                on:select={handleHairColorChange}
            />
        </div>
    </div>
</div>
