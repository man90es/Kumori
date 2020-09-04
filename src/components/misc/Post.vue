<template>
	<article :class="{selected: $store.getters.isSelectedForDeletion(post.id)}">
		<div class="postDetails">
			<span v-if="post.modifiers && 'sage' in post.modifiers"><img class="icon" src="../../assets/icons/down.svg"></span>
			<router-link class="refLink" :to="{name: 'thread', params: {threadId: post.threadId}}">
				<span class="subject" v-if="post.subject">{{formatSubject()}}</span> #{{post.number}}
			</router-link>
			<button><img class="icon" src="../../assets/icons/menu.svg" @click="showMenu = !showMenu"></button>
			<PostMenu v-if="showMenu" :parent="{hideMenu, post}" />
			<button><img class="icon" src="../../assets/icons/reply.svg" @click="handleReplyClick"></button>
			<time>{{formatDate()}}</time>
		</div>
		<div v-if="!$store.getters.isHidden(post.id)">
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
			'post'
		],
		data() {
			return {
				parsedText: this.post.text,
				showMenu: false
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

			formatSubject() {
				let subject = this.post.subject
				return subject.length > 55 ? truncateString(subject, 55) : subject
			},

			async formatText() {
				this.parsedText = await processMarkup(this.post.text)
			},

			hideMenu() {
				this.showMenu = false
			},

			handleReplyClick() {
				let thread = this.$store.getters.getThread(this.post.threadId)
				this.$bus.emit('post-reply-button-click', {
					boardName: thread.boardName, 
					threadNumber: thread.head.number, 
					postNumber: this.post.number, 
					postId: this.post.id
				})
			}
		},
		created() {
			this.formatText()
		}
	}
</script>

<style scoped>
	article{
		margin: calc(var(--gap-size) - 1px) 0;
		padding: var(--gap-size);
		border: 1px solid transparent;
	}

	article.selected {
		border-color: var(--link-hover-color);
	}

	article:first-child{
		background-color: var(--card-color);
	}

	article:not(:first-child){
		background-color: var(--card-secondary-color);
		margin-left: calc(var(--gap-size) * 4);
	}

	.postDetails{
		position: relative;
	}

	time{
		position: absolute;
		right: 0;
		color: var(--text-secondary-color);
	}

	.subject{
		color: var(--text-secondary-color);
	}

	.attachments *{
		margin-right: var(--gap-size);
	}

	p {
		margin: 0;
	}
</style>
