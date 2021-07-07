<template>
	<div id="app" :style="theme" v-touch:swipe="swipeHandler">
		<svg class="zero"> <!-- Used for blurring NSFW images -->
			<filter id="sharpBlur">
				<feGaussianBlur stdDeviation="5"></feGaussianBlur>
				<feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"></feColorMatrix>
				<feComposite in2="SourceGraphic" operator="in"></feComposite>
			</filter>
		</svg>

		<router-view />
	</div>
</template>

<script>
	import { log } from './utils'

	export default {
		name: 'App',
		data() {
			return {
				themes: [
					{
						'--text-color': '#bbc',
						'--text-secondary-color': '#99a',
						'--text-green-color': '#98c379',
						'--card-color': '#292d35',
						'--card-secondary-color': '#252931',
						'--background-color': '#21252b',
						'--link-over-color': '#40c0f3',
						'--link-hover-color': '#108fbf',
						'--gap-size': '0.5rem',
						'--icon-invert': '70%'
					},
					{
						'--text-color': '#37474f',
						'--text-secondary-color': '#666',
						'--text-green-color': '#789922',
						'--card-color': '#ededed',
						'--card-secondary-color': '#ededed',
						'--background-color': '#e6e6e6',
						'--link-over-color': '#d7535c',
						'--link-hover-color': '#096be8',
						'--gap-size': '0.5rem',
						'--icon-invert': '40%'
					}
				]
			}
		},
		methods: {
			swipeHandler(direction) {
				emitter.emit(`swipe-${direction}`)
			},

			findPost(postNumber) {
				return Object.values(this.$store.state.posts).find(post => post.number == postNumber)
			},

			postLinkHoveredHandler(link) {
				if (link.dataset.requested != undefined) return
				if (link.dataset.boardName == undefined) link.dataset.boardName = this.$route.params.boardName
				let postNumber = parseInt(link.dataset.number)

				if (this.findPost(postNumber) == undefined) {
					this.$store.dispatch('requestPost', {boardName: link.dataset.boardName, number: postNumber})
				}

				link.dataset.requested = true
			},

			postLinkClickedHandler(link) {
				this.$router.push({name: 'thread', params: {
					boardName: link.dataset.boardName,
					threadId: this.findPost(parseInt(link.dataset.number)).threadId
				}})
			},

			scrollHandler() {
				let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

				if (bottomOfWindow) {
					log('Page end reached')
					emitter.emit('page-end-reached', {})
				}
			}
		},
		computed: {
			theme() {
				return this.themes[this.$store.state.theme]
			}
		},
		created() {
			this.$store.dispatch('requestBoardList')

			emitter.on('post-link-hovered', this.postLinkHoveredHandler)
			emitter.on('post-link-clicked', this.postLinkClickedHandler)

			window.onscroll = this.scrollHandler
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
		filter: invert(var(--icon-invert));
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
			padding: var(--gap-size);
			margin: var(--gap-size) 0;
		}
	}

	u {
		text-decoration-skip-ink: none;
	}

	.zero {
		height: 0;
		width: 0;
	}

	button {
		border: none;
		background-color: transparent;
		cursor: pointer;
		vertical-align: middle;
		padding: 0 0.25em;
		outline: none;
	}

	input, textarea {
		outline: none;
	}
</style>
