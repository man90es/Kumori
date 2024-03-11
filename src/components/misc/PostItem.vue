<template>
	<article v-if="post !== undefined" :class="{ [$style.root]: true, [$style.selected]: marks?.selected }">
		<div :class="$style.postDetails">
			<img v-if="marks?.bookmarked" class="icon" :class="$style.preIcon" src="@/assets/icons/star.svg" />
			<img v-if="props.pinned" class="icon" :class="$style.preIcon" src="@/assets/icons/push_pin.svg" />
			<img v-if="post?.modifiers?.includes('sage')" class="icon" :class="$style.preIcon" src="@/assets/icons/down.svg" />
			<a @click="handleRefLinkClick">
				<span :class="$style.subject" v-if="post?.subject">{{ formattedSubject }}</span>
				#{{ post?.number }}
			</a>
			<button>
				<img class="icon" src="@/assets/icons/menu.svg" @click="toggleMenu" />
			</button>
			<PostMenu v-if="menuVisible && postId" :postId="postId" @cancel="toggleMenu" />
			<button>
				<img class="icon" src="@/assets/icons/reply.svg" @click="handleReplyClick" />
			</button>
			<time :class="$style.time" :title="preciseDate">{{ prettyDate }}</time>
			<span v-if="settings.debug">b:"{{ thread?.boardName }}" tid:{{ post?.threadId }} pid:{{ postId }}</span>
		</div>
		<div v-if="!marks?.hidden">
			<div v-if="post?.attachments" :class="$style.attachments">
				<PostAttachment v-for="file, i in post.attachments" :file="file" :key="i" />
			</div>
			<p :class="$style.text" v-if="post?.text" v-html="parsedText" />
			<PostRepliesList v-if="post?.replies?.length" :replies="post.replies" />
		</div>
	</article>
</template>

<script setup lang="ts">
	import { computed, inject, ref, watch } from "vue"
	import { PostAttachment, PostMenu, PostRepliesList } from "@/components/misc"
	import { truncateString, renderMarkup, getPrettyTimeDelta } from "@/utils"
	import { usePostMarksStore, useSettingsStore } from "@/stores"
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"
	import type { Post, StoreState } from "@/store"
	import type FKClient from "@bakaso/fkclient"

	const API = inject<FKClient>("API")
	const props = defineProps<{ pinned?: boolean, postId: number }>()

	const postMarksStore = usePostMarksStore()
	const router = useRouter()
	const settings = useSettingsStore()
	const store = useStore<StoreState>()

	const menuVisible = ref(false)
	function toggleMenu() {
		menuVisible.value = !menuVisible.value
	}

	const post = computed<Post | undefined>(() => store.state.posts[props.postId] ?? undefined)
	const parsedText = computed<string>(() => renderMarkup(post.value?.text || ""))
	const formattedSubject = computed<string>(() => truncateString(post.value?.subject ?? "", 55))
	const thread = computed(() => post.value?.threadId ? store.state.threads[post.value.threadId] : undefined)
	const prettyDate = computed(() => post.value?.created ? getPrettyTimeDelta(new Date(post.value.created)) : undefined)
	const preciseDate = computed(() => post.value?.created ? new Date(post.value.created).toLocaleString("en-GB") : undefined)
	const marks = computed(() => postMarksStore.postMarks(props.postId))

	function handleReplyClick() {
		window.emitter.emit("post-reply-button-click", {
			boardName: thread.value?.boardName,
			postNumber: post.value?.number,
			threadId: post.value?.threadId,
			threadNumber: thread.value?.head.number,
		})
	}

	function handleRefLinkClick() {
		router.push({
			name: "thread",
			params: {
				boardName: thread.value?.boardName,
				threadId: post.value?.threadId,
			},
		})
	}

	watch(() => post.value, (newValue, oldValue) => {
		if (undefined === thread.value && undefined === oldValue && undefined !== newValue) {
			API?.thread.request({ threadId: post.value?.threadId })
		}
	})

	if (undefined === post.value) {
		API?.post.request({ postId: props.postId })
	}
</script>

<style module>
	.root {
		background-color: var(--card-color);
		border: 1px solid transparent;
		margin: calc(var(--gap-size) - 1px) 0;
		padding: var(--gap-size);

		&.selected {
			border-color: var(--link-hover-color);
		}

		&:not(:first-child) {
			background-color: var(--card-secondary-color);
			margin-left: calc(var(--gap-size) * 4);
		}
	}

	.postDetails {
		position: relative;
	}

	.time {
		color: var(--text-secondary-color);
		cursor: default;
		font-size: 0.9rem;
		position: absolute;
		right: 0;
	}

	.subject {
		color: var(--text-secondary-color);
	}

	.attachments {
		display: flex;
		gap: var(--gap-size);
	}

	.text {
		margin: 0;
	}

	.preIcon {
		height: 1.3rem;
		vertical-align: sub;
	}
</style>
