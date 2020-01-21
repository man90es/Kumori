<template>
	<article v-if='post'>
		<div class='postDetails'>
			<span v-if='post.sage'><img class='icon' src='../../assets/icons/material-icons/ic_arrow_downward_24px.svg'></span>
			<a class='refLink' href='#'><span class='subject'>{{post.subject || ''}}</span> #{{post.number}}</a>
			<span><img class='icon' src='../../assets/icons/material-icons/ic_menu_24px.svg'></span>
			<span><img class='icon' src='../../assets/icons/material-icons/ic_reply_24px.svg'></span>
			<span class='star'><img class='icon' src='../../assets/icons/material-icons/ic_star_24px.svg'></span>
			<time>{{post.createdAt}}</time>
		</div>
		<div class='postBody'>
			<div class='thumbnails' v-if='post.files'>
				<PostAttachment :file='post.files[0]' />
			</div>

			<div class='postText'>
				{{ post.rawText }}
			</div>
		</div>
	</article>
</template>

<script>
	import PostAttachment from './PostAttachment'

	export default {
		name: 'Post',
		components: {
			PostAttachment
		},
		props: ['post']
	}
</script>

<style scoped>
	article{
		min-height: 2em;
		background-color: #282c34;
		margin: 0.25rem 0;
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
		right: 0.5rem;
	}
</style>
