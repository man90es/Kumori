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
		cursor: pointer;
		transition: color 0.1s;
	}

	a:hover {
		color: #47769d;
	}

	.icon{
		filter: invert(69%);
		vertical-align: middle;
	}

	q::before{
		content: ''
	}

	q::after{
		content: ''
	}

	q{
		color: #98c379
	}

	span.spoiler{
		background: 0 0;
		transition: text-shadow 0.1s, color 0.1s;
	}

	span.spoiler:not(:hover){
		color: transparent;
		text-shadow: 0 0 .3em #a8afbc;
	}

	code {
		background: #21252b;
		padding: .1rem .3rem;
		font-size: 1rem;
		user-select: all;
	}

	pre {
		margin: 0;
		white-space: pre-wrap;

		& > code {
			display: block;
			padding: 0.5rem;
			margin: 0.5rem 0;
		}
	}

	u {
		text-decoration-skip-ink: none;
	}
</style>
