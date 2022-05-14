<template>
	<modal-shell :header="header">
		<form @submit.prevent="initialCaptchaCheck">
			<input hidden type="checkbox" id="sage" v-model="sage">
			<label for="sage"><img class="icon" src="../../assets/icons/down.svg"></label>
			<input hidden type="checkbox" id="signed" v-model="signed">
			<label for="signed"><img class="icon" src="../../assets/icons/trip_origin.svg"></label>
			<input hidden type="checkbox" id="op" v-model="op">
			<label for="op"><img class="icon" src="../../assets/icons/person_pin.svg"></label>
			<input type="text" v-model="subject">

			<textarea v-model="text"></textarea>

			<div id="attachmentsForm">
				<button type="button" id="attachFile" @click="attachHandler" v-if="files.length < fileLimit">
					<img class="icon" src="../../assets/icons/attach_file.svg">
				</button>

				<div class="thumb" :key="i" v-for="(file, i) in files" :style="{backgroundImage: `url(${thumbs[i]})`}">
					<button class="nsfwToggle" type="button" @click="toggleAttachmentNSFW(i)">
						<img class="icon" v-if="attachmentNSFW[i]" src="../../assets/icons/nsfw.svg">
						<img class="icon" v-else src="../../assets/icons/sfw.svg">
					</button>
					<button class="deleteAttachment" type="button" @click="deleteAttachment(i)"><img class="icon" src="../../assets/icons/close.svg"></button>
				</div>
			</div>

			<button id="submit">
				<img class="icon" src="../../assets/icons/send.svg">
			</button>
		</form>
	</modal-shell>
</template>

<script>
	import ModalShell from "./ModalShell.vue"
	import API from "../../api"
	import { getProps } from "../../utils"

	export default {
		name: 'FormModal',
		props: [
			'threadId',
			'boardName',
			'threadNumber',
			'postNumber',
		],
		components: {
			ModalShell
		},
		data() {
			return {
				subject: '',
				text: '',
				sage: false,
				signed: false,
				op: false,
				files: [],
				attachmentNSFW: [],
				thumbs: [],
				waitingToSubmit: false,
				fileLimit: 2, // Hardcoded for now, the real value has to be taken from API
			}
		},
		watch: {
			postNumber: function(newPostNumber) {
				this.insertPostLink(newPostNumber)
			}
		},
		methods: {
			initialCaptchaCheck() {
				API.captcha.validate({ code: 0 })
			},

			insertPostLink(postNumber) {
				if (undefined === postNumber) return
				this.text += `>>${postNumber}\r`
			},

			attachHandler() {
				let fileInput = document.createElement('input')
				fileInput.type = 'file'
				fileInput.style = 'display:none'
				fileInput.addEventListener('change', (event) => {
					this.files.push(fileInput)
					this.attachmentNSFW.push(false)
					this.attachmentChangeHandler(event)
				})

				fileInput.click()
			},

			attachmentChangeHandler(event) {
				let file = event.target.files[0]

				if (file.type.match('image.*')) {
					let reader = new FileReader()

					reader.onload = (event) => {
						this.thumbs.push(event.target.result)
					}

					reader.readAsDataURL(file)
				} else {
					this.thumbs.push(null)
				}
			},

			toggleAttachmentNSFW(i) {
				this.attachmentNSFW[i] = !this.attachmentNSFW[i]
				this.$forceUpdate()
			},

			deleteAttachment(i) {
				this.files.splice(i, 1)
				this.thumbs.splice(i, 1)
				this.attachmentNSFW.splice(i, 1)
			},

			submit() {
				this.waitingToSubmit = false

				API.post.create({
					...getProps(this, ["threadId", "boardName", "sage", "signed", "op", "subject", "text"]),
					attachments: this.files.map((fileInput, i) => {
						return {
							file: fileInput.files[0],
							spoiler: this.attachmentNSFW[i],
						}
					})
				})
			},

			reset() {
				this.text = ''
				this.subject = ''
				this.files = []
				this.attachmentNSFW = []
				this.thumbs = []
			},
		},
		computed: {
			header: function () {
				return this.$store.state.settings.debug
					? `b:"${this.boardName}" tid:${this.threadId} tn:${this.threadNumber}`
					: this.threadId
						? this.$t("formModal.postHeader", getProps(this, ["threadNumber", "boardName"]))
						: this.$t("formModal.threadHeader", getProps(this, ["boardName"]))
			}
		},
		created() {
			this.insertPostLink(this.postNumber)
			emitter.on('captcha-solved', this.submit)

			// Handle reply to captcha submission
			API.addListener(
				message => 'checkCaptcha' === message.what?.request,
				(message) => {
					if (message.data.trustedPostCount > 0) {
						this.submit()
					} else {
						this.waitingToSubmit = true
						emitter.emit('need-captcha', {})
					}
				}
			)

			// Handle reply to post submission
			API.addListener(
				message => "createPost" === message.what?.request,
				(message) => {
					this.reset()

					const threadId = message.what?.threadId || message.data?.threadId
					const boardName = this.$store.state.threads[threadId]?.boardName
					this.$router.push({ name: "thread", params: { threadId, boardName } })
				}
			)
		}
	}
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
		padding: 2%;
		grid-column: 1/6;
		min-height: 7em;
		min-width: 30em;
		width: 100%;
		resize: none;
		background-color: var(--background-color);
		border: none;
		color: var(--text-color);
		font-size: 1rem;
		box-sizing: border-box;
		margin-top: var(--gap-size);
		margin-bottom: 0;
	}

	#attachmentsForm, .thumb {
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

	#submit, #attachFile {
		background-color: var(--background-color);
		width: 100%;
	}

	#submit .icon, #attachFile .icon, #attachmentsForm .icon {
		opacity: 1;
		height: 50%;
	}

	.thumb{
		height: 3.5rem;
		width: 3.5rem;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;

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
