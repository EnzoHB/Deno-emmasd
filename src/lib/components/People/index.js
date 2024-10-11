import Bodies_1 from "./Svelte/Bodies_1.svelte"; 
import Eyes_1 from "./Svelte/Eyes_1.svelte"; 
import Female_1 from "./Svelte/Female_1.svelte"; 
import Female_2 from "./Svelte/Female_2.svelte"; 
import Female_3 from "./Svelte/Female_3.svelte"; 
import Male_1 from "./Svelte/Male_1.svelte"; 
import Male_2 from "./Svelte/Male_2.svelte"; 
import Male_3 from "./Svelte/Male_3.svelte"; 

 let resources = { 
 	"Bodies": { "1": Bodies_1 } , 
	"Eyes": { "1": Eyes_1 } , 
	"Female": { "1": Female_1,"2": Female_2,"3": Female_3 } , 
	"Male": { "1": Male_1,"2": Male_2,"3": Male_3 } , 
 }; let palettes ={"Bodies":{"1":{"colors":{"#FE9574":"#FE9574"},"strokes":{"black":"black"}}},"Eyes":{"1":{"colors":{"white":"white","#0376A8":"#0376A8","black":"black"},"strokes":{"black":"black"}}},"Female":{"1":{"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}},"2":{"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}},"3":{"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}}},"Male":{"1":{"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}},"2":{"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}},"3":{"colors":{"#F19138":"#F19138"},"strokes":{"black":"black"}}}} 
 export { resources, palettes }