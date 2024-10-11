<script>
    export let text = 700
    export let pt = 2
    export let pb = 1
    export let font = 'medium'
    export let classes = ''
</script>

<span class="block text-sm font-{font} text-slate-{text} pt-{pt} pb-{pb} {classes}">
    <slot/>
</span>