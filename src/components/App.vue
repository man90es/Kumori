<template>
	<div id='app'>
		<router-view :boards='boards' :siteTitle='siteTitle' />
	</div>
</template>

<script type='text/javascript'>
	import API from '../api'
	import config from '../../config'

	export default {
		name: 'App',
		components: {

		},
		data() {
			return {
				boards: [],
				siteTitle: config.siteTitle
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
		font-family: 'Noto Sans', 'Avenir', Helvetica, Arial, sans-serif;
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
