<template>
	<article v-if="![postId, post].includes()" :class="{ selected: marks.selected }">
		<div class="postDetails">
			<img v-if="props.pinned" class="icon pre-icon" src="@/assets/icons/push_pin.svg" />
			<img v-if="post.modifiers?.includes('sage')" class="icon pre-icon" src="@/assets/icons/down.svg" />
			<a class="refLink" @click="handleRefLinkClick">
				<span class="subject" v-if="post.subject">{{ formattedSubject }}</span> #{{ post.number }}
			</a>
			<button>
				<img class="icon" src="@/assets/icons/menu.svg" @click="toggleMenu" />
			</button>
			<PostMenu v-if="menuVisible" :postId="postId" @cancel="toggleMenu" />
			<button>
				<img class="icon" src="@/assets/icons/reply.svg" @click="handleReplyClick" />
			</button>
			<time :title="preciseDate">{{ prettyDate }}</time>
			<span v-if="settings.debug">b:"{{ thread?.boardName }}" tid:{{ post.threadId }} pid:{{ postId }}</span>
		</div>
		<div v-if="!marks.hidden">
			<div v-if="post.attachments" class="attachments">
				<PostAttachment v-for="(file, index) in post.attachments" :file="file" :key="index" />
			</div>
			<p v-if="post.text" v-html="parsedText" />
			<ul class="replies" v-if="replies?.length">
				Mentions:
				<li v-for="reply of replies" :key="reply.href">
					<RouterLink :to="reply.href">{{ reply.label }}</RouterLink>
				</li>
			</ul>
		</div>
	</article>
</template>

<script setup>
	import { computed, inject, ref, watch } from "vue"
	import { truncateString, renderMarkup, getPrettyTimeDelta } from "@/utils"
	import { usePostMarksStore } from "@/stores/postMarks"
	import { useRouter, useRoute } from "vue-router"
	import { useSettingsStore } from "@/stores/settings"
	import { useStore } from "vuex"
	import PostAttachment from "@/components/misc/PostAttachment"
	import PostMenu from "@/components/misc/PostMenu"

	const API = inject("API")
	const props = defineProps({
		pinned: {
			default: false,
			type: Boolean,
		},
		postId: {
			required: true,
			type: Number,
		},
	})

	const postMarksStore = usePostMarksStore()
	const route = useRoute()
	const router = useRouter()
	const settings = useSettingsStore()
	const store = useStore()

	const menuVisible = ref(false)
	function toggleMenu() {
		menuVisible.value = !menuVisible.value
	}

	const post = computed(() => store.state.posts[props.postId])
	const parsedText = computed(() => renderMarkup(post.value.text || ""))
	const formattedSubject = computed(() => truncateString(post.value.subject, 55))
	const thread = computed(() => store.state.threads[post.value.threadId])
	const prettyDate = computed(() => getPrettyTimeDelta(new Date(post.value.created)))
	const preciseDate = computed(() => new Date(post.value.created).toLocaleString("en-GB"))
	const marks = computed(() => postMarksStore.postMarks(props.postId))

	function handleReplyClick() {
		window.emitter.emit("post-reply-button-click", {
			boardName: thread.value.boardName,
			postNumber: post.value.number,
			threadId: post.value.threadId,
			threadNumber: thread.value.head.number,
		})
	}

	function handleRefLinkClick() {
		router.push({
			name: "thread",
			params: {
				boardName: thread.value.boardName,
				threadId: post.value.threadId,
			},
		})
	}

	watch(() => post.value, (newValue, oldValue) => {
		if (undefined === thread.value && undefined === oldValue && undefined !== newValue) {
			API.thread.request({ threadId: post.value.threadId })
		}
	})

	if (undefined === post.value) {
		API.post.request({ postId: props.postId })
	}

	const replies = computed(() => (
		post.value?.replies?.map(reply => ({
			href: `/${reply.boardName}/${reply.threadId}`,
			label: route.params.boardName === reply.boardName
				? `#${reply.number}`
				: `#/${reply.boardName}/${reply.number}`
		}))
	))
</script>

<style scoped lang="scss">
	article {
		margin: calc(var(--gap-size) - 1px) 0;
		padding: var(--gap-size);
		border: 1px solid transparent;

		&.selected {
			border-color: var(--link-hover-color);
		}

		&:first-child {
			background-color: var(--card-color);
		}

		&:not(:first-child) {
			background-color: var(--card-secondary-color);
			margin-left: calc(var(--gap-size) * 4);
		}

		.postDetails {
			position: relative;
		}

		time {
			position: absolute;
			right: 0;
			color: var(--text-secondary-color);
			font-size: 0.9rem;
			cursor: default;
		}

		.subject {
			color: var(--text-secondary-color);
		}

		.attachments {
			display: flex;
			gap: var(--gap-size);
		}

		p {
			margin: 0;
		}

		.icon.pre-icon {
			vertical-align: middle;
			height: 1.3em;
		}

		.replies {
			display: flex;
			font-size: 0.85em;
			gap: 0.5em;
			list-style: none;
			margin: 1em 0 0 0;
			padding: 0;
		}
	}
</style>
