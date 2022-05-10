<template>
	<article v-if="![postId, post].includes(undefined)" :class="{ selected }">
		<div class="postDetails">
			<img v-if="post.modifiers.includes('sage')" class="sage icon" src="../../assets/icons/down.svg">
			<a class="refLink" @click="handleRefLinkClick">
				<span class="subject" v-if="post.subject">{{formattedSubject}}</span> #{{post.number}}
			</a>
			<button><img class="icon" src="../../assets/icons/menu.svg" @click="toggleMenu"></button>
			<post-menu v-if="menuVisible" :postId="postId" @cancel="toggleMenu" />
			<button><img class="icon" src="../../assets/icons/reply.svg" @click="handleReplyClick"></button>
			<time :title="formatDateFull()">{{formatDate()}}</time>
			<span v-if="$store.state.debug">b:"{{ thread?.boardName }}" tid:{{ post.threadId }} pid:{{ postId }}</span>
		</div>
		<div v-if="!hidden">
			<div v-if="post.attachments" class="attachments">
				<post-attachment v-for="(file, index) in post.attachments" :file="file" :key="index" />
			</div>

			<p v-if="post.text" v-html="parsedText"></p>
		</div>
	</article>
</template>

<script setup>
	import { ref } from "vue"

	import PostAttachment from "./PostAttachment"
	import PostMenu from "./PostMenu"

	const menuVisible = ref(false)

	function toggleMenu() {
		menuVisible.value = !menuVisible.value
	}
</script>

<script>
	import API from '../../api'

	import { truncateString, processMarkup } from '../../utils'

	export default {
		props: [
			'postId'
		],
		computed: {
			post() {
				return this.$store.state.posts[this.postId]
			},

			parsedText() {
				return processMarkup(this.post.text)
			},

			formattedSubject() {
				const subject = this.post.subject
				return subject?.length > 55 ? truncateString(subject, 55) : subject
			},

			hidden() {
				return this.$store.state.hiddenPostsList.includes(this.postId)
			},

			selected() {
				return this.$store.state.selectedPostsList.includes(this.postId)
			},

			thread() {
				return this.$store.state.threads[this.post.threadId]
			}
		},
		methods: {
			formatDate() {
				const date = new Date(this.post.created)
				const diff = new Date() - date

				if (diff < 6048e5) {
					if (diff < 4e4){
						return this.$t("post.recently")
					}

					const minutes = Math.round(diff / 6e4)
					if (minutes < 50){
						return this.$t("post.minutesAgo", minutes, { count: minutes })
					}

					const hours = Math.round(diff / 3.6e6)
					if (hours < 20){
						return this.$t("post.hoursAgo", hours, { count: hours })
					}

					const days = Math.round(diff / 8.64e7)
					if (days == 1){
						return this.$t("post.yesterday")
					}

					return this.$t("post.daysAgo", days, { count: days })
				} else {
					return date.toLocaleDateString(this.$i18n.locale, { year: "numeric", month: "long", day: "numeric" })
				}
			},

			formatDateFull() {
				const d = new Date(this.post.created)

				const date = d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, 0) + "-" + d.getDate().toString().padStart(2, 0)
				const time = d.getHours().toString().padStart(2, 0) + ":" + d.getMinutes().toString().padStart(2, 0)

				return date + " " + time
			},

			handleReplyClick() {
				emitter.emit('post-reply-button-click', {
					threadId: this.post.threadId,
					boardName: this.thread.boardName,
					threadNumber: this.thread.head.number,
					postNumber: this.post.number
				})
			},

			handleRefLinkClick() {
				this.$router.push({
					name: 'thread',
					params: {
						boardName: this.thread.boardName,
						threadId: this.post.threadId
					}
				})
			}
		},
		watch: {
			post(newValue, oldValue) {
				if (undefined === this.thread && undefined === oldValue && undefined !== newValue) {
					API.thread.request({ threadId: this.post.threadId })
				}
			}
		},
		created() {
			if (undefined === this.post && undefined !== this.postId) {
				API.post.request({ postId: this.postId })
			}
		}
	}
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

		.attachments * {
			margin-right: var(--gap-size);
		}

		p {
			margin: 0;
		}

		.sage.icon {
			vertical-align: middle;
			height: 1.3em;
		}
	}
</style>
