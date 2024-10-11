import fs from 'fs/promises'
import path from 'path'
import { customAlphabet } from 'nanoid'

let nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz')

let $lib = "./src/lib"

let folders = {
    Bodies: "$lib/components/People/Bodies",
    Eyes: "$lib/components/People/Eyes",
    Female: "$lib/components/People/Female",
    Male: "$lib/components/People/Male",
}

let output = "$lib/components/People/Svelte"
let outputFolderName = output.split('/').at(-1);

output = output.replace("$lib", $lib)

buildHuman()

async function buildHuman() {
    await clearDirectory(output)
    await buildSvgs()
};

async function clearDirectory(directory) {
    for (const file of await fs.readdir(directory)) {
        await fs.unlink(path.join(directory, file));
      }
};

async function buildSvgs() {

    let imports = [];
    let resources = {};
    let paletteResources = {};

    for (let layer in folders) {

        let layerMap = {  }
        let paletteLayerMap = {}

        let path = folders[layer].replace("$lib", $lib)
        let directory = await fs.readdir(path);
    
        for (let filepath of directory) {
    
            let filename = filepath.split('.').at(0);
            let svg = await fs.readFile(path + "/" + filepath, { encoding: 'utf-8' })
    
            let fillRegExp = /fill="(.+?)"/g
            let strokeRegExp = /stroke="(.+?)"/g
    
            let palette = {
                colors: {},
                strokes: {},
            };
    
            let matches = []
    
            for (let match of svg.matchAll(fillRegExp)) {
    
                // First group of the regular expression
                let color = match[1] 
    
                // Doesn't concern us 
                if (color.toLowerCase() == 'none')
                    continue
    
                matches.push(match)
    
                palette.colors[color] = color
            };
    
            for (let match of svg.matchAll(strokeRegExp)) {
    
                // First group of the regular expression
                let stroke = match[1] 
    
                // Doesn't concern us 
                if (stroke.toLowerCase() == 'none')
                    continue
                
                palette.strokes[stroke] = stroke
            };
            
            let svelteHeader = `<svelte:options accessors={true} />

<script>

    import { createEventDispatcher } from 'svelte'

    let dispatch = createEventDispatcher();
    
    export let palette = ${JSON.stringify(palette)}

    function handleClick(event) {
        dispatch("click", { event, palette })
    };

    function press(event) {
        // Handle acessibility later
    };

</script>

`
            // We have to do this in order to implement the click
            // events that will trigger the color picker once the 
            // path is clicked

            // Append on:click event on children

            let allTagsRegExp = /\<(.+? )(.+?)\>/g
            let tags = [ ]

            for (let tag of svg.matchAll(allTagsRegExp)) {

                // If the name of the tag == svg
                if (tag[1].trim() == 'svg') {
                    // Push the whole opening of the tag
                    tags.push(tag[0])
                    continue
                }

                // Replace the matched tag with 
                // the name of the tag + click event + everything that was after it
                let newOne = "\t <" + tag[1] + `on:click={handleClick} ` + tag[2] + ">"
            
                tags.push(newOne);
            }

            // Lets close what we opened
            tags.push('</svg>')

            svg = tags.join('\n')

            // We will replace every color we find with a reference
            // to the color pallette we just made

            for (let color in palette.colors) {

                let fillRegExp = new RegExp(`fill="(${color})"`, 'g')
                svg = svg.replaceAll(fillRegExp, `fill={palette.colors["${color}"]}`)
            }
    
            for (let stroke in palette.strokes) {
                let strokeRegExp = new RegExp(`stroke="(${stroke})"`, 'g')
                svg = svg.replaceAll(strokeRegExp, `stroke={palette.strokes["${stroke}"]}`)
            }
    
            function merge(object) {
                return JSON.stringify(Object.assign({}, ...object))
            }

            // ------------------ Writing ----------------------- //
    
            let file = svelteHeader + svg
            let newFilename = `${layer}_${filename}.svelte`
            
            await fs.writeFile(output + `/${newFilename}`, file)

            layerMap[filename] = `${newFilename.split('.')[0]}`
            paletteLayerMap[filename] = palette

            imports.push(`import ${newFilename.split('.')[0]} from "./${outputFolderName}/${newFilename}"; \n`)
        };

        paletteResources[layer] = paletteLayerMap;
        resources[layer] = layerMap
    }

    // ---------------- Index JS -------------------- //
    
    imports = imports.join('')

    let exports = []

    // Create pseudo json that enables 
    // the calling of the imported variable

    for (let layer in resources) {

        let obj = []

        for (let name in resources[layer]) {

            let js = `"${name}": ${resources[layer][name]}`
            obj.push(js);
        };

        exports.push(`\t"${layer}": { ${obj.join(',')} } , \n`)
    }


    exports = `\n let resources = { \n ${exports.join('')} }; \n let palettes =${JSON.stringify(paletteResources)} \n export { resources, palettes }`

    let indexjs = imports  + exports

    await fs.writeFile('./src/lib/components/People/index.js', indexjs)
}

