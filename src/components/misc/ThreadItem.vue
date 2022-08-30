<template>
	<div v-if="thread">
		<PostItem :postId="thread.head.id" :pinned="'pinned' in thread" />
		<RouterLink
			v-if="$route.name == 'board' && omittedPosts && pageSize"
			:to="{ name: 'thread', params: { threadId } }"
		>
			Omitted posts: {{ omittedPosts }}
		</RouterLink>
		<PostItem :key="postId" :postId="postId" v-for="postId in tail" />
	</div>
</template>

<script setup>
	import { computed, ref, watch } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import PostItem from "@/components/misc/PostItem.vue"

	const props = defineProps({ threadId: Number, pageSize: Number })
	const route = useRoute()
	const store = useStore()

	const deferredPostRequest = ref(false)
	const thread = computed(() => store.state.threads[props.threadId])
	const pageSize = computed(() => Math.min(props.pageSize, thread.value?.posts))
	const tail = computed(() =>
		0 === props.pageSize
			? []
			: (store.state.postLists[props.threadId] || [])
					.slice(-pageSize.value)
					.filter((pId) => thread.value.head.id !== pId)
	)
	const omittedPosts = computed(() =>
		"board" === route.name ? Math.max(thread.value.posts - 1 - pageSize.value, 0) : 0
	)

	function requestPostList() {
		switch (route.name) {
			case "board":
				if (
					pageSize.value > 0 &&
					thread.value.posts > 1 &&
					tail.value.length < Math.min(thread.value.posts - 1, pageSize.value)
				) {
					API.post.requestMany({ threadId: props.threadId, count: pageSize.value, page: "tail" })
				}

				break
			case "thread":
				if (thread.value.posts > 1) {
					API.post.requestMany({ threadId: props.threadId, count: pageSize.value })
				}

				break
		}
	}

	// Request additional tail posts when user changes the number of posts in tail
	watch(
		() => pageSize.value,
		(next, last) => {
			if (next > last) {
				requestPostList()
			}
		}
	)

	watch(
		() => thread.value,
		(next, last) => {
			if (deferredPostRequest.value && undefined === last && undefined !== next) {
				deferredPostRequest.value = false
				requestPostList()
			}
		}
	)

	try {
		requestPostList()
	} catch (error) {
		console.debug("Thread is not ready for post request")
		deferredPostRequest.value = true
	}
</script>

<style scoped>
	a {
		color: var(--text-secondary-color);
		font-size: 0.9rem;
		margin-left: calc(var(--gap-size) * 4);
	}
</style>
