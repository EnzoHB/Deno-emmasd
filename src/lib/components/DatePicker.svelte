<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let age = 0;

  $: currentDate = new Date(new Date().setFullYear(new Date().getFullYear() - age - 1))

  let selectedDate = null;

  $: year = currentDate.getFullYear();
  $: month = currentDate.getMonth();

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const daysOfWeekLong = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function previousMonth() {
    currentDate = new Date(year, month - 1, 1);
  }

  function nextMonth() {
    currentDate = new Date(year, month + 1, 1);
  }

  function selectDate(day) {
    selectedDate = new Date(year, month, day);
    dispatch('dateSelect', { date: selectedDate });
  }

  $: calendarDays = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => i + 1
  );

  $: firstDayOfMonth = getFirstDayOfMonth(year, month);

  function calculateDisplayDate(selectedDate) {

	let week = daysOfWeekLong[selectedDate.getDay()]
	let dayOfTheMont = selectedDate.getDate()
	let month = monthNames[selectedDate.getMonth()]
	let year = selectedDate.getFullYear();

	return `${week}, ${dayOfTheMont} de ${month} de ${year}`
  };
</script>

<div class='pt-2'>
	<span class="block text-sm font-medium text-slate-700">Aniversário</span>
	<span class="block text-sm font-small text-slate-400">{selectedDate? `Selecione uma data: ${calculateDisplayDate(selectedDate)}` : "Selecione uma data"}</span>
</div>

<div class="w-64 bg-white shadow-md overflow-hidden ">
  <div>
    	<div class="bg-blue-500 rounded-lg rounded-b-none text-white p-4 flex justify-between items-center rounded-lg">
      		<button on:click={previousMonth} class="text-white hover:text-blue-200">
        		&lt;
      		</button>
      	<span class="font-bold">{monthNames[month]} {year}</span>
      		<button on:click={nextMonth} class="text-white hover:text-blue-200">
        		&gt;
      		</button>
    	</div>
    	<div class="p-4">
      		<div class="grid grid-cols-7 gap-1 mb-2">
        		{#each daysOfWeek as day}
          			<div class="text-center text-sm font-medium text-gray-700">{day}</div>
        		{/each}
      		</div>
      		<div class="grid grid-cols-7 gap-1">
        		{#each Array(firstDayOfMonth) as _}
          		<div></div>
        		{/each}
        		{#each calendarDays as day}
          			<button
            		on:click={() => selectDate(day)}
            		class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 {selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? 'bg-blue-500 text-white' : 'text-gray-700'}"
          			>
            		{day}
          		</button>
        	{/each}
      	</div>
    	</div>
	</div>
</div>