<template>
	<ModalShell :header="headerText">
		<form @submit.prevent="initialCaptchaCheck">
			<input hidden type="checkbox" id="sage" v-model="form.sage" />
			<label for="sage">
				<img class="icon" src="@/assets/icons/down.svg" />
			</label>
			<input hidden type="checkbox" id="signed" v-model="form.signed" />
			<label for="signed">
				<img class="icon" src="@/assets/icons/trip_origin.svg" />
			</label>
			<input hidden type="checkbox" id="op" v-model="form.op" />
			<label for="op">
				<img class="icon" src="@/assets/icons/person_pin.svg" />
			</label>
			<input type="text" v-model="form.subject" />
			<textarea v-model="form.text" />
			<div id="attachmentsForm">
				<button type="button" id="attachFile" @click="attachHandler" v-if="form.files.length < fileLimit">
					<img class="icon" src="@/assets/icons/attach_file.svg" />
				</button>
				<div
					:key="i"
					:style="{ backgroundImage: thumbs[i] ? `url(${thumbs[i]})` : 'none' }"
					class="thumb"
					v-for="(file, i) in form.files"
				>
					<button class="nsfwToggle" type="button" @click="toggleAttachmentNSFW(i)">
						<img class="icon" v-if="form.attachmentNSFW[i]" src="@/assets/icons/nsfw.svg" />
						<img class="icon" v-else src="@/assets/icons/sfw.svg" />
					</button>
					<button class="deleteAttachment" type="button" @click="deleteAttachment(i)">
						<img class="icon" src="@/assets/icons/close.svg" />
					</button>
				</div>
			</div>
			<button id="submit">
				<img class="icon" src="@/assets/icons/send.svg" />
			</button>
		</form>
	</ModalShell>
</template>

<script setup>
	import { computed, reactive, ref, onMounted, watch, onUnmounted } from "vue"
	import { generateThumbnail } from "@/utils"
	import { useRouter } from "vue-router"
	import { useSettingsStore } from "@/stores/settings"
	import { useStore } from "vuex"
	import { useToast } from "vue-toast-notification"
	import API from "@/api"
	import ModalShell from "@/components/misc/ModalShell"

	const props = defineProps({
		threadId: {
			type: Number,
		},
		boardName: {
			type: String,
		},
		threadNumber: {
			type: Number,
		},
		postNumber: {
			type: Number,
		},
	})

	const router = useRouter()
	const store = useStore()
	const toast = useToast()

	const initialFormState = {
		op: false,
		sage: false,
		signed: false,
		subject: "",
		text: "",
	}
	const form = reactive({
		...initialFormState,
		attachmentNSFW: [],
		files: [],
	})
	function reset() {
		Object.entries(initialFormState)
			.forEach(([key, value]) => form[key] = value)

		form.attachmentNSFW.length = 0
		form.files.length = 0
	}

	const thumbs = ref([])
	const waitingToSubmit = ref(false)
	const fileLimit = 2 // Hardcoded for now, the real value has to be taken from API

	function insertPostLink(postNumber) {
		undefined !== postNumber && (form.text += `>>${postNumber}\r`)
	}

	watch(() => props.postNumber, n => insertPostLink(n))

	function initialCaptchaCheck() {
		API.captcha.getTrustedPostCount()
	}

	function attachmentChangeHandler({ target: { files } }) {
		generateThumbnail(files[0]).then((t) => thumbs.value.push(t))
	}

	function attachHandler() {
		const fileInput = document.createElement("input")
		fileInput.type = "file"
		fileInput.style = "display:none"
		fileInput.addEventListener("change", (event) => {
			form.files.push(fileInput)
			form.attachmentNSFW.push(false)
			attachmentChangeHandler(event)
		})

		fileInput.click()
	}

	function toggleAttachmentNSFW(i) {
		form.attachmentNSFW[i] = !form.attachmentNSFW[i]
	}

	function deleteAttachment(i) {
		form.files.splice(i, 1)
		thumbs.value.splice(i, 1)
		form.attachmentNSFW.splice(i, 1)
	}

	function submit() {
		waitingToSubmit.value = false

		API.post.create({
			threadId: props.threadId,
			boardName: props.boardName,
			subject: form.subject,
			text: form.text,
			sage: form.sage,
			signed: form.signed,
			op: form.op,
			attachments: form.files.map((fileInput, i) => ({
				file: fileInput.files[0],
				spoiler: form.attachmentNSFW[i],
			})),
		})
	}

	const settings = useSettingsStore()

	const headerText = computed(() => settings.debug
		? `b:"${props.boardName}" tid:${props.threadId} tn:${props.threadNumber}`
		: props.threadId
			? `Reply to thread #${props.threadNumber} on board /${props.boardName}`
			: `New thread on board /${props.boardName}`
	)

	onMounted(() => {
		insertPostLink(props.postNumber)
	})

	const checkCaptchaCatcher = ({ what }) => ["trustedPostCount", "checkCaptcha"].includes(what?.request)
	const createPostCatcher = ({ what }) => "createPost" === what?.request

	onMounted(() => {
		// Handle server response to captcha submission
		API.addInMessageListener(checkCaptchaCatcher,
			({ data }) => {
				if (data.trustedPostCount > 0) {
					submit()
				} else {
					waitingToSubmit.value = true
					window.emitter.emit("need-captcha", {})
				}
			}
		)

		// Handle server response to post submission
		API.addInMessageListener(createPostCatcher,
			({ what, data, error }) => {
				toast.success(`${what.threadId ? "Post" : "Thread"} created`, { position: "top-right" })

				if (error) {
					return
				}

				reset()

				if (settings.noko) {
					const threadId = what?.threadId || data.threadId
					const boardName = store.state.threads[threadId]?.boardName
					router.push({ name: "thread", params: { threadId, boardName } })
				}
			}
		)
	})

	onUnmounted(() => {
		API.removeInMessageListener(checkCaptchaCatcher)
		API.removeInMessageListener(createPostCatcher)
	})
</script>

<style scoped lang="scss">
	form {
		display: grid;
		grid-template-rows: 1.75rem 1fr 3.5rem;
		grid-template-columns: 3rem 3rem 3rem 1fr 3rem;
		height: calc(100% - 2rem);
		justify-items: center;
	}

	input {
		grid-column: 4/6;
		height: 100%;
		border: none;
		padding: 2%;
		box-sizing: border-box;
		background-color: var(--background-color);
		color: var(--text-color);
		text-align: center;
		font-size: 1rem;
		width: 100%;
	}

	textarea {
		background-color: var(--background-color);
		border: none;
		box-sizing: border-box;
		color: var(--text-color);
		font-size: 1rem;
		grid-column: 1/6;
		margin-bottom: 0;
		margin-top: var(--gap-size);
		min-height: 7em;
		min-width: min(30em, calc(100vw - 1em));
		padding: 2%;
		resize: none;
		width: 100%;
	}

	#attachmentsForm,
	.thumb {
		grid-column: 1/5;
		width: 100%;
		height: 100%;
		background-color: var(--background-color);
		display: flex;
	}

	.icon {
		height: 100%;
		cursor: pointer;
		opacity: 0.5;
	}

	input[type="checkbox"]:checked + label .icon {
		opacity: 1;
	}

	#submit,
	#attachFile {
		background-color: var(--background-color);
		width: 100%;
	}

	#submit .icon,
	#attachFile .icon,
	#attachmentsForm .icon {
		opacity: 1;
		height: 50%;
	}

	.thumb {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 3.5rem;
		width: 3.5rem;

		button {
			opacity: 0;
			width: 50%;
			height: 100%;
		}

		&:hover button {
			opacity: 1;
			filter: blur(0);
		}
	}

	#attachFile {
		width: 3rem;
	}

	.nsfwToggle {
		background-color: #00c5;
	}

	.deleteAttachment {
		background-color: #c005;
	}
</style>
