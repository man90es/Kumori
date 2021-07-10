<template>
	<article v-if="![postId, post].includes(undefined)" :class="{ selected }">
		<div class="postDetails">
			<img v-if="post.modifiers.includes('sage')" class="sage icon" src="../../assets/icons/down.svg">
			<a class="refLink" @click="handleRefLinkClick">
				<span class="subject" v-if="post.subject">{{formattedSubject}}</span> #{{post.number}}
			</a>
			<button><img class="icon" src="../../assets/icons/menu.svg" @click="showMenu = !showMenu"></button>
			<PostMenu v-if="showMenu" />
			<button><img class="icon" src="../../assets/icons/reply.svg" @click="handleReplyClick"></button>
			<time>{{formatDate()}}</time>
			<span v-if="$store.state.debug">b:"{{ thread?.boardName }}" tid:{{ post.threadId }} pid:{{ postId }}</span>
		</div>
		<div v-if="!hidden">
			<div v-if="post.attachments" class="attachments">
				<PostAttachment v-for="(file, index) in post.attachments" :file="file" :key="index" />
			</div>

			<p v-if="post.text" v-html="parsedText"></p>
		</div>
	</article>
</template>

<script>
	import PostAttachment from './PostAttachment'
	import PostMenu from './PostMenu'
	import { num2Word, truncateString, processMarkup } from '../../utils'

	export default {
		name: 'Post',
		components: {
			PostAttachment,
			PostMenu
		},
		props: [
			'postId'
		],
		data() {
			return {
				showMenu: false
			}
		},
		computed: {
			post() {
				return this.$store.state.posts[this.postId]
			},

			parsedText() {
				return processMarkup(this.post.text)
			},

			formattedSubject() {
				const subject = this.post.subject
				return subject?.length > 55 ? truncateString(subject, 55) : subject
			},

			hidden() {
				return this.$store.state.hiddenPostsList.includes(this.postId)
			},

			bookmarked() {
				return this.$store.state.bookmarkedPostsList.includes(this.postId)
			},

			selected() {
				return this.$store.state.selectedPostsList.includes(this.postId)
			},

			thread() {
				return this.$store.state.threads[this.post.threadId]
			}
		},
		methods: {
			formatDate() {
				let date = new Date(this.post.created)
				let diff = new Date() - date

				if (diff < 6048e5) {
					if (diff < 4e4){
						return "recently"
					}

					let minutes = Math.round(diff / 6e4)
					if (minutes < 50){
						return `${minutes} ${num2Word(minutes, ['minute', 'minutes'])} ago`
					}

					let hours = Math.round(diff / 3.6e6)
					if (hours < 20){
						return `${hours} ${num2Word(hours, ['hour', 'hours'])} ago`
					}

					let days = Math.round(diff / 8.64e7)
					if (days == 1){
						return "yesterday"
					}

					return `${days} ${num2Word(days, ['day', 'days'])} ago`
				} else {
					return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
				}
			},

			hideMenu() {
				this.showMenu = false
			},

			handleReplyClick() {
				emitter.emit('post-reply-button-click', {
					threadId: this.post.threadId,
					boardName: this.thread.boardName,
					threadNumber: this.thread.head.number,
					postNumber: this.post.number
				})
			},

			handleRefLinkClick() {
				this.$router.push({
					name: 'thread',
					params: {
						boardName: this.thread.boardName,
						threadId: this.post.threadId
					}
				})
			}
		},
		watch: {
			post(newValue, oldValue) {
				if (this.thread == undefined && oldValue == undefined && newValue != undefined) {
					this.$store.dispatch('requestThread', {id: this.post.threadId})
				}
			}
		},
		created() {
			if (undefined === this.post && undefined !== this.postId) {
				this.$store.dispatch('requestPost', {id: this.postId})
			}
		}
	}
</script>

<style scoped lang="scss">
	article {
		margin: calc(var(--gap-size) - 1px) 0;
		padding: var(--gap-size);
		border: 1px solid transparent;

		&.selected {
			border-color: var(--link-hover-color);
		}

		&:first-child {
			background-color: var(--card-color);
		}

		&:not(:first-child) {
			background-color: var(--card-secondary-color);
			margin-left: calc(var(--gap-size) * 4);
		}

		.postDetails {
			position: relative;
		}

		time {
			position: absolute;
			right: 0;
			color: var(--text-secondary-color);
			font-size: 0.9rem;
		}

		.subject {
			color: var(--text-secondary-color);
		}

		.attachments * {
			margin-right: var(--gap-size);
		}

		p {
			margin: 0;
		}

		.sage.icon {
			vertical-align: middle;
			height: 1.3em;
		}
	}
</style>
