<template>
	<main>
		<PageHeader :board='board' />
		<slot />
	</main>
</template>

<script>
	import PageHeader from '../misc/PageHeader.vue'

	export default {
		name: 'MainSection',
		components: {
			PageHeader
		},
		props: ['board']
	}
</script>

<style>
	main{
		width: 50em;
		margin: 0 0.5rem;
	}
</style>