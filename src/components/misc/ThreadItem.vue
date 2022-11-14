<template>
	<div v-if="thread">
		<PostItem :postId="thread.head.id" :pinned="'pinned' in thread" />
		<RouterLink v-if="omittedPosts && props.pageSize > 0" :to="{ name: 'thread', params: { threadId } }">
			Omitted posts: {{ omittedPosts }}
		</RouterLink>
		<PostItem :key="postId" :postId="postId" v-for="postId in tail" />
	</div>
</template>

<script setup>
	import { computed, watch } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import PostItem from "@/components/misc/PostItem"

	const props = defineProps({ threadId: Number, pageSize: Number })
	const route = useRoute()
	const store = useStore()

	const thread = computed(() => store.state.threads[props.threadId])
	const pageSize = computed(() => Math.min(props.pageSize, thread.value?.posts))
	const tail = computed(() => 0 === props.pageSize
		? []
		: (store.state.postLists[props.threadId] || [])
			.slice(-pageSize.value)
			.filter((pId) => thread.value.head.id !== pId)
	)
	const omittedPosts = computed(() => Math.max(0, thread.value.posts - 1 - pageSize.value))

	function requestPostList() {
		// Do nothing if thread only has one post (OP)
		if (!thread.value || thread.value.posts < 2) {
			return
		}

		switch (route.name) {
			case "board":
				// Do nothing if user selected to not show tails or selected
				// a shorter tail than the one that was already requested
				if (pageSize.value < 1 || tail.value.length >= Math.min(thread.value.posts - 1, pageSize.value)) {
					return
				}

				return API.post.requestMany({ threadId: props.threadId, count: pageSize.value, page: "tail" })

			case "thread":
				return API.post.requestMany({ threadId: props.threadId, count: pageSize.value })
		}
	}

	// Request additional tail posts when user changes the number of posts in tail
	watch(() => pageSize.value, (next, last) => {
		if ("board" !== route.name || next <= last) {
			return
		}

		requestPostList()
	})

	requestPostList()
</script>

<style scoped>
	a {
		color: var(--text-secondary-color);
		font-size: 0.9rem;
		margin-left: calc(var(--gap-size) * 4);
	}
</style>
