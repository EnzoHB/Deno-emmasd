<script>

    import Header from "./Header.svelte";
    import Desc from "./Desc.svelte";

    export let header;
    export let desc;

</script>

<div>
    <Header>{header}</Header>
    <Desc>{desc}</Desc>
</div>