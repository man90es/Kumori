<template>
	<header>
		<router-link :to='{name: "board", params: {boardId: board.id}}'>
			<h2>/{{board.id}}/ — {{board.title}}</h2>
			<h4>{{board.subtitle}}</h4>
		</router-link>
	</header>
</template>

<script>
	export default {
		name: 'PageHeader',
		props: ['board']
	}
</script>

<style scoped>
	header{
		background-color: #282c34;
		margin-bottom: 0.25rem;
		padding: 0.5rem;
		display: flex;
	}

	h2, h4{
		margin: 0;
	}

	h2{
		color: #a8afbc;
	}

	h4{
		font-weight: normal;
	}
</style>
