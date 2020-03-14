<template>
	<div v-if="!mobile">
		<router-link to="/">{{siteTitle}}</router-link>
		<router-link :key='boardName' :to='{name: "board", params: {boardName}}' v-for='(board, boardName) in boards'>/{{boardName}}</router-link>
	</div>
</template>

<script>
	export default {
		name: 'NavBar',
		props: [
			'siteTitle'
		],
		data() {
			return {
				mobile: window.innerWidth < window.innerHeight
			}
		},
		computed: {
			boards: function() {
				return this.$store.state.boards
			}
		}
	}
</script>

<style scoped>
	div{
		height: 100vh;
		position: sticky;
		display: flex;
		flex-direction: column;
		text-align: right;
		top: 0;
	}

	a:first-child{
		color: var(--text-color);
		font-size: 2rem;
		font-weight: bold;
	}
</style>
