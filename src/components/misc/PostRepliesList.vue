<template>
	<ul :class="$style.root">
		Mentions:
		<li v-for="reply of processedReplies" :key="reply.href">
			<RouterLink :to="reply.href">{{ reply.label }}</RouterLink>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { firstFromStringArrayOrString } from "@/utils"
	import { useRoute } from "vue-router"
	import type { Post } from "@/store"

	const props = defineProps<{ replies: Post["replies"] }>()
	const route = useRoute()

	const processedReplies = computed(() => {
		const currentBoardName = firstFromStringArrayOrString(route.params.boardName)

		return props.replies.map(({ boardName, threadId, number }) => ({
			href: `/${boardName}/${threadId}`,
			label: boardName === currentBoardName
				? `#${number}`
				: `#/${boardName}/${number}`
		}))
	})
</script>

<style module>
	.root {
		display: flex;
		font-size: 0.85em;
		gap: 0.5em;
		list-style: none;
		margin: 1em 0 0 0;
		padding: 0;
	}
</style>
