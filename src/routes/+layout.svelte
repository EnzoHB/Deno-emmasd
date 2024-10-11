<script>
    import "../app.css"
</script>

<!-- Top Navigation Bar -->

<div class='flex flex-col h-screen w-screen'>
    <nav class="bg-white shadow-md font-nunito w-full h-fit">
        <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
            <div class="flex-shrink-0 flex items-center">
            <!-- Logo -->
                <img src="/logo.svg" class='w-10 h-10' alt=Spectrum/>
            <a href="https://enzo.com"class="text-2xl px-2 font-bold text-gray-800">Spectrum</a>
            </div>
        </div>
        </div>
    </nav>

    <slot/>

</div>