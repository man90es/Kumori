<template>
	<header>
		/{{title}}
	</header>
</template>

<script>
	export default {
		name: 'PageHeader',
		props: ['title']
	}
</script>

<style>
	header{
		background-color: #282c34;
		margin: 0.25rem 0;
	}
</style>
