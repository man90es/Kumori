<template>
	<main>
		<PageHeader :title='$route.params.board' />
		<slot />
	</main>
</template>

<script>
	import PageHeader from '../misc/PageHeader.vue'

	export default {
		name: 'MainSection',
		components: {
			PageHeader
		}
	}
</script>

<style>
	main{
		width: 50em;
		margin: 0.5rem;
	}
</style>