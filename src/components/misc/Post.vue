<template>
	<article v-if='post'>
		<div class='postDetails'>
			<span v-if='post.sage'><img class='icon' src='../../assets/icons/down.svg'></span>
			<a class='refLink' href='#'><span class='subject'>{{post.subject || defaultSubject}}</span> #{{post.number}}</a>
			<span><img class='icon' src='../../assets/icons/menu.svg'></span>
			<span><img class='icon' src='../../assets/icons/reply.svg'></span>
			<span><img class='icon' src='../../assets/icons/star.svg'></span>
			<time>{{calculateDate()}}</time>
		</div>
		<div>
			<div v-if='post.files'>
				<PostAttachment :file='post.files[0]' />
			</div>

			<div v-if='post.rawText'>
				{{ post.rawText }}
			</div>
		</div>
	</article>
</template>

<script>
	import PostAttachment from './PostAttachment'
	import utils from '../../utils'

	export default {
		name: 'Post',
		components: {
			PostAttachment
		},
		props: [
			'post',
			'defaultSubject'
		],
		methods: {
			calculateDate() {
				let date = new Date(this.post.createdAt)
				let diff = new Date() - date

				if (diff < 6048e5) {
					if (diff < 4e4){
						return "recently"
					}

					let minutes = Math.round(diff / 6e4)
					if (minutes < 50){
						return `${minutes} ${utils.num2Word(minutes, ['minute', 'minutes'])} ago`
					}

					let hours = Math.round(diff / 3.6e6)
					if (hours < 20){
						return `${hours} ${utils.num2Word(hours, ['hour', 'hours'])} ago`
					}

					let days = Math.round(diff / 8.64e7)
					if (days == 1){
						return "yesterday"	
					}

					return `${days} ${utils.num2Word(days, ['day', 'days'])} ago`
				} else {
					return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
				}
			}
		}
	}
</script>

<style scoped>
	article{
		min-height: 2em;
		background-color: #282c34;
		margin: 0.5rem 0;
		padding: 0.5rem;
	}

	article:not(:first-child){
		margin-left: 2rem;
	}

	.postDetails{
		position: relative;
	}

	time{
		position: absolute;
		right: 0;
		color: #888f9c;
	}

	.subject{
		color: #888f9c;
	}
</style>
