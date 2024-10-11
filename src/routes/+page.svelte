<script lang="js">
  
  	import Dialog from '$lib/components/Dialog.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SideLabeledInput from '$lib/components/DialogInput.svelte';
	import DatePicker from '../lib/components/DatePicker.svelte';
	import DialogInput from '$lib/components/DialogInput.svelte';
	import DialogSection from '$lib/components/DialogSection.svelte';

	import Human from '$lib/components/Human.svelte';
	import HumanCrafter from '$lib/components/HumanCrafter.svelte';

  let alias = ''
  let fullName = ''
  let email = ''
  let phoneNumber = ''

  let age = ''
  let birthday = ''

  function handleDateSelect(event) {
    birthday = event.detail.date
  };

  let skin = ''

  let hairColor = ''
  let hairType = ''
  let eyeColor = ''
  let height = ''


  let firstDegreeFriends = []
  let relationships = []

  let score = ''
  let experiments = ''
  let personDescription = ''
  let tags = []

  let isDialogOpen = false;

  function toggleDialog() {
    isDialogOpen = !isDialogOpen;
  };

</script>

{#if isDialogOpen}
	<Dialog>
  		<DialogSection>
      		<SectionHeader 
				header={`Crie ${alias || "uma Pessoa"}`} 
				desc='Coloque informações que permitam identificar o indivíduo'
			/>
			<DialogInput 
				id='alias' 
				label='Apelido'
				placeholder='Apelido'
				bind:value={alias}
			/>
			<DialogInput 
				id='name' 
				label='Nome'
				placeholder='Nome completo'
				bind:value={fullName}
			/>
			<DialogInput 
				id='email' 
				label='Email'
				placeholder='Endereço de email'
				bind:value={email}
			/>
			<DialogInput 
				id='phoneNumber' 
				label='Whatsapp'
				placeholder='Número de telefone'
				bind:value={phoneNumber}
			/>
		</DialogSection>
		<DialogSection>
			<SectionHeader 
				header={`Situe ${alias} no tempo`}
				desc="Coloque informações que dizem respeito à idade da pessoa"
			/>
			<DialogInput 
				id='age'
				type=number
				label={!age? "Idade" : `Idade ${age} anos`}
				placeholder='Em Anos'
				bind:value={age}
			/>
			<DatePicker on:dateSelect={handleDateSelect} {age}/>
		</DialogSection>
		<DialogSection>
			<SectionHeader 
				header = "Como {alias} se parece?"
				desc="Coloque os traços físicos do indivíduo escolhido"
			/>
			<DialogInput
				id='height'
				type='number'
				label="Altura"
				placeholder="Em Centímetros"
			/>
			
			<HumanCrafter/>
		</DialogSection>
	</Dialog>
{/if}

<div class="grid place-content-center h-full">
  <div class='flex'>
    <img src="/person.png" class='' alt=person/>
    <div class="flex flex-col h-full w-40 ">
      <h1 class='font-bold text-4xl pb-3 pt-3'>Bem vindo, </h1>
      <p class='text-left pb-3'>Parece que você não possui nenhuma pessoa adicionada</p>
      <button on:click={toggleDialog} class='inline-flex items-center justify-center font-semibold text-white bg-sky-500 hover:bg-sky-800 rounded-lg w-full px-3 py-1'>
        Criar pessoa
      </button>
    </div>
  </div>
</div> 