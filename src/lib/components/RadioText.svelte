<script>
	import { createEventDispatcher } from "svelte";

    export let options

    let dispatch = createEventDispatcher()
    let selected = null

    function handleSelect(event, option, index) {
        selected = index
        dispatch('select', { event, option, index })
    }

</script>

<div class='flex gap-1'>
    {#each options as option, index}
        {#if selected === index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={event => handleSelect(event, option, index)} style="background-color: {option.color}; color: {option.text}" class='radio selected'>{option.label}</div>
        {:else} 
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={event => handleSelect(event, option, index)} class='radio' >{option.label}</div>
        {/if}
    {/each}
</div>

<style>

.radio {
    font-size: 12px;
    background-color: #8080803d;
    color: rgb(119, 119, 119);
    border-radius: 5px;
    padding: 2px 5px
}

.radio.selected {
    background: #a1a1a1;
    color: white; 
}

</style>