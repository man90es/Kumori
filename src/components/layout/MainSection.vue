<template>
	<main>
		<PageHeader :board="board" :type="type" />
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
		props: [
			'board',
			'type'
		]
	}
</script>

<style>
	main{
		width: 50em;
		margin: 0 calc(var(--gap-size) / 2);
	}
</style>