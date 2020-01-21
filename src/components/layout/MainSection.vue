<template>
	<main>
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

<style scoped>
	main{
		width: 50em;
		margin: 0.5rem;
	}
</style>