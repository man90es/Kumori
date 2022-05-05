<template>
	<div v-if="thread">
		<post-item :postId="thread.head.id" />
		<router-link v-if="$route.name == 'board' && omittedPosts && pageSize" :to="{ name: 'thread', params: { threadId } }">
			{{ $t("post.omittedCount", { count: omittedPosts }) }}
		</router-link>
		<post-item :key="postId" :postId="postId" v-for="postId in tail" />
	</div>
</template>

<script setup>
	import { computed, ref, watch } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"

	import { Logger } from "../../utils"
	import API from "../../api"
	import PostItem from "./PostItem.vue"

	const props = defineProps({ threadId: Number, pageSize: Number })
	const route = useRoute()
	const store = useStore()

	const deferredPostRequest = ref(false)
	const thread = computed(() => store.state.threads[props.threadId])
	const tail = computed(() => (
		props.pageSize == 0
			? []
			: (store.state.postLists[props.threadId] || []).slice(Math.max(thread.value.posts - props.pageSize, 1)).filter(Boolean)
	))
	const omittedPosts = computed(() => (
		"board" === route.name
			? Math.max(thread.value.posts - 1 - props.pageSize, 0)
			: 0
	))

	function requestPostList() {
		switch (route.name) {
			case "board":
				if (props.pageSize > 0 && thread.value.posts > 1 && tail.value.length < Math.min(thread.value.posts - 1, props.pageSize)) {
					API.post.requestMany({ threadId: props.threadId, count: props.pageSize, page: "tail"})
				}

				break
			case "thread":
				if (thread.value.posts > 1) {
					API.post.requestMany({ threadId: props.threadId, count: props.pageSize })
				}

				break
		}
	}

	// Request additional tail posts when user changes the number of posts in tail
	watch(() => props.pageSize, (next, last) => {
		if (next > last) {
			requestPostList()
		}
	})

	watch(() => thread.value, (next, last) => {
		if (deferredPostRequest.value && undefined === last && undefined !== next) {
			deferredPostRequest.value = false
			requestPostList()
		}
	})

	try {
		requestPostList()
	} catch(error) {
		deferredPostRequest.value = true
		Logger.debug("Thread is not ready for post request")
	}
</script>

<style scoped>
	a {
		color: var(--text-secondary-color);
		font-size: 0.9rem;
		margin-left: calc(var(--gap-size) * 4);
	}
</style>
