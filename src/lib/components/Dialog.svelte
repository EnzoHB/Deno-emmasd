<script>

    import { createEventDispatcher } from "svelte";

</script>

<div class='fixed inset-0 z-40 bg-black/50 grid place-content-center'>
    <div class=' 
            z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] rounded-xl bg-white
            p-6 shadow-lg overflow-scroll'
    >
        <div class="flex gap-4 flex-col h-full space-even">
            <slot/>
        </div>
    </div>
</div>
