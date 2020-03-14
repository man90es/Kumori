<template>
	<div id='app' :style="theme" v-touch:swipe="swipeHandler">
		<svg class="zero"> <!-- Used for blurring NSFW images -->
			<filter id='sharpBlur'>
				<feGaussianBlur stdDeviation='5'></feGaussianBlur>
				<feColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0'></feColorMatrix>
				<feComposite in2='SourceGraphic' operator='in'></feComposite>
			</filter>
		</svg>

		<router-view :siteTitle='siteTitle' />
	</div>
</template>

<script type='text/javascript'>
	import API from '../api'
	import config from '../../config'

	export default {
		name: 'App',
		data() {
			return {
				siteTitle: config.siteTitle,
				theme: {
					'--text-color': '#bbc',
					'--text-secondary-color': '#99a',
					'--text-green-color': '#98c379',
					'--card-color': '#292d35',
					'--card-secondary-color': '#252931',
					'--background-color': '#21252b',
					'--link-over-color': '#40c0f3',
					'--link-hover-color': '#108fbf',
					'--gap-size': '1rem'
				}
			}
		},
		methods: {
			swipeHandler(direction) {
				this.$bus.emit(`swipe-${direction}`)
			}
		},
		created() {
			this.$store.dispatch('updateBoardsList')
		}
	}
</script>

<style>
	#app {
		font-family: 'Noto Sans', 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--text-color);
		display: flex;
		background-color: var(--background-color);
	}

	a {
		color: var(--link-over-color);
		cursor: pointer;
		transition: color 0.1s;
		text-decoration: none;
	}

	a:hover {
		color: var(--link-hover-color);
	}

	.icon{
		filter: invert(75%);
		vertical-align: middle;
	}

	q::before{
		content: ''
	}

	q::after{
		content: ''
	}

	q{
		color: var(--text-green-color)
	}

	span.spoiler{
		background: 0 0;
		transition: text-shadow 0.1s, color 0.1s;
	}

	span.spoiler:not(:hover){
		color: transparent;
		text-shadow: 0 0 .3em var(--text-color);
	}

	code {
		background: var(--background-color);
		padding: .1rem .3rem;
		font-size: 1rem;
		user-select: all;
	}

	pre {
		margin: 0;
		white-space: pre-wrap;

		& > code {
			display: block;
			padding: calc(var(--gap-size) / 2);
			margin: calc(var(--gap-size) / 2) 0;
		}
	}

	u {
		text-decoration-skip-ink: none;
	}

	.zero {
		height: 0;
		width: 0;
	}

	button{
		border: none;
		background-color: transparent;
		cursor: pointer;
		vertical-align: middle;
		padding: 0 0.25em;
	}
</style>
