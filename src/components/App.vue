<template>
	<div id='app'>
		<router-view :boards='boards'/>
	</div>
</template>

<script type='text/javascript'>
	import API from '../api'

	export default {
		name: 'App',
		components: {

		},
		data() {
			return {
				boards: []
			}
		},
		methods: {

		},
		created() {
			API.readBoards('Default', (data) => {
				this.boards = data.boards
			})
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #a8afbc;
		display: flex;
		background-color: #21252b;
	}

	a {
		color: #5facec;
	}

	a:hover {
		color: #47769d;
	}

	.icon{
		filter: invert(69%);
		vertical-align: middle;
	}
</style>
