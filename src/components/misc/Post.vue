<template>
	<article v-if='post'>
		<div class='postDetails'>
			<span v-if='"sage" in post.modifiers'><img class='icon' src='../../assets/icons/down.svg'></span>
			<a class='refLink' href='#'><span class='subject'>{{formatSubject()}}</span> #{{post.number}}</a>
			<button><img class='icon' src='../../assets/icons/menu.svg'></button>
			<button><img class='icon' src='../../assets/icons/reply.svg'></button>
			<time>{{formatDate()}}</time>
		</div>
		<div>
			<div v-if="post.attachments" class="attachments">
				<PostAttachment v-for="(file, index) in post.attachments" :file="file" :key="index" />
			</div>

			<div v-if='post.text' v-html='parsedText'></div>
		</div>
	</article>
</template>

<script>
	import PostAttachment from './PostAttachment'
	import { num2Word, truncateString, processMarkup } from '../../utils'

	export default {
		name: 'Post',
		components: {
			PostAttachment
		},
		props: [
			'post'
		],
		data() {
			return {
				parsedText: this.post.text
			}
		},
		methods: {
			formatDate() {
				let date = new Date(this.post.createdAt)
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
			}
		},
		created() {
			this.formatText()
		}
	}
</script>

<style scoped>
	article{
		min-height: 2em;
		margin: calc(var(--gap-size) / 2) 0;
		padding: calc(var(--gap-size) / 2);
	}

	article:first-child{
		background-color: var(--card-color);
	}

	article:not(:first-child){
		background-color: var(--card-secondary-color);
		margin-left: calc(var(--gap-size) * 2);
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
		margin-right: calc(var(--gap-size) / 2);
	}
</style>
