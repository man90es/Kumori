<template>
	<div v-if="thread">
		<Post :postId="thread.head.id" />
		<Post :key="postId" :postId="postId" v-for="postId in tail" />
	</div>
</template>

<script>
	import Post from './Post.vue'
	import { log } from '../../utils'
	
	export default {
		name: 'Thread',
		components: {
			Post
		},
		props: [
			'threadId',
			'pageSize'
		],
		data() {
			return {
				deferredPostRequest: false
			}
		},
		computed: {
			thread() {
				return this.$store.state.threads[this.threadId]
			},

			tail() {
				if (this.pageSize == 0) {
					return []
				} else {
					return (this.$store.state.postLists[this.threadId] || []).slice(Math.max(this.thread.posts - this.pageSize, 1)).filter(Boolean)
				}
			}
		},
		methods: {
			requestPostList() {
				switch (this.$route.name) {
					case 'board':
						if (this.pageSize > 0 && this.thread.posts > 1 && this.tail.length < Math.min(this.thread.posts - 1, this.pageSize)) {
							this.$store.dispatch('requestPostList', {threadId: this.threadId, count: this.pageSize, page: 'tail'})
						}

						break
					case 'thread':
						if (this.thread.posts > 1) {
							this.$store.dispatch('requestPostList', {threadId: this.threadId, count: this.pageSize, page: 0})
						}
						break
				}
			}
		},
		watch: {
			thread(newValue, oldValue) {
				if (this.deferredPostRequest && oldValue == undefined && newValue != undefined) {
					this.deferredPostRequest = false
					this.requestPostList()
				}
			},

			pageSize(newValue, oldValue) {
				if (newValue > oldValue) {
					this.requestPostList()
				}
			}
		},
		created() {
			try {
				this.requestPostList()
			} catch(error) {
				this.deferredPostRequest = true
				log('Thread not ready for post request')
			}
		}
	}
</script>
