<template>
	<article v-if="![postId, post].includes(undefined)" :class="{ selected: isSelected }">
		<div class="postDetails">
			<img v-if="props.pinned" class="icon pre-icon" src="@/assets/icons/push_pin.svg" />
			<img v-if="post.modifiers.includes('sage')" class="icon pre-icon" src="@/assets/icons/down.svg" />
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
			<span v-if="$store.state.settings.debug">
				b:"{{ thread?.boardName }}" tid:{{ post.threadId }} pid:{{ postId }}
			</span>
		</div>
		<div v-if="!isHidden">
			<div v-if="post.attachments" class="attachments">
				<post-attachment v-for="(file, index) in post.attachments" :file="file" :key="index" />
			</div>
			<p v-if="post.text" v-html="parsedText" />
		</div>
	</article>
</template>

<script setup>
	import { computed, ref, onMounted, watch } from "vue"
	import { truncateString, processMarkup, getPrettyTimeDelta } from "@/utils"
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"
	import API from "@/api"
	import PostAttachment from "@/components/misc/PostAttachment"
	import PostMenu from "@/components/misc/PostMenu"

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

	const store = useStore()
	const router = useRouter()

	const menuVisible = ref(false)
	function toggleMenu() {
		menuVisible.value = !menuVisible.value
	}

	const post = computed(() => store.state.posts[props.postId])
	const parsedText = computed(() => processMarkup(post.value.text))
	const formattedSubject = computed(() => truncateString(post.value.subject, 55))
	const isHidden = computed(() => store.state.hiddenPostsList.includes(props.postId))
	const isSelected = computed(() => store.state.selectedPostsList.includes(props.postId))
	const thread = computed(() => store.state.threads[post.value.threadId])
	const prettyDate = computed(() => getPrettyTimeDelta(new Date(post.value.created)))
	const preciseDate = computed(() => new Date(post.value.created).toLocaleString("en-GB"))

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

	watch(
		() => post.value,
		(newValue, oldValue) => {
			if (undefined === thread.value && undefined === oldValue && undefined !== newValue) {
				API.thread.request({ threadId: post.value.threadId })
			}
		}
	)

	onMounted(() => undefined === post.value && API.post.request({ postId: props.postId }))
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
	}
</style>
