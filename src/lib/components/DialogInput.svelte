<script>
    export let placeholder;
    export let id;
    export let label;
    export let value; 
</script>

<label for={id} name={id}>
    <span class="block text-sm font-medium text-slate-700 pt-2 pb-1">{label}</span>
    <input {placeholder} type='text' bind:value class="block mt-1 inline w-full bg-white p-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
</label>
