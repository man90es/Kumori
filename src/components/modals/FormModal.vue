<template>
	<form @submit.prevent="submitHandler()">
		<input hidden type="checkbox" name="modifiers:sage" id="modifiers:sage">
		<label for="modifiers:sage"><img class="icon" src="../../assets/icons/down.svg"></label>
		<input hidden type="checkbox" name="modifiers:signed" id="modifiers:signed">
		<label for="modifiers:signed"><img class="icon" src="../../assets/icons/trip_origin.svg"></label>
		<input hidden type="checkbox" name="modifiers:OP" id="modifiers:OP">
		<label for="modifiers:OP"><img class="icon" src="../../assets/icons/person_pin.svg"></label>
		<input type="text" name="subject" v-model="subject">
		
		<textarea v-model="text" name="text"></textarea>

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
</template>

<script>
	import { submitPost, submitCaptcha } from '../../api'
	import { log } from '../../utils'

	export default {
		name: 'FormModal',
		props: [
			'originalData'
		],
		data() {
			return {
				text: '',
				subject: '',
				files: [],
				attachmentNSFW: [],
				thumbs: [],
				threadId: null,
				boardName: null,
				threadNumber: null,
				waitingToSubmit: false,
				fileLimit: 2 // Hardcoded for now, needs to be real value taken from API
			}
		},
		methods: {
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

			handleDataUpdate(data) {
				this.threadId = data.threadId
				this.boardName = data.boardName
				this.threadNumber = data.threadNumber

				this.$parent.setParams({
					header: this.$store.state.debug 
						? `b:"${this.boardName}" tid:${this.threadId} tn:${this.threadNumber}` 
						: data.threadId 
							? `Reply to thread #${this.threadNumber} on board /${this.boardName}` 
							: `New thread on board /${this.boardName}`
				})

				if (data.postNumber) {
					this.text += `>>${data.postNumber}\r`
				}
			},

			submitHandler() {
				submitCaptcha(null).then((response) => {
					if (response.trustedPostCount > 0) {
						this.submit()
					} else {
						this.waitingToSubmit = true
						this.$bus.emit('need-captcha', {})
					}
				}).catch((error) => {
					log('Exception occurred while trying to check remaining posts:', error)
				})
			},

			submit() {
				this.waitingToSubmit = false
				let data = new FormData(this.$el)

				this.threadId ? data.append('threadId', this.threadId) : data.append('boardName', this.boardName)

				for (let i in this.files) {
					// File input
					data.append(`file:${i}`, this.files[i].files[0])

					// NSFW checkbox
					if (this.attachmentNSFW[i]) {
						data.append(`fileMark:${i}:NSFW`, true)
					}
				}

				submitPost(data).then((response) => {
					this.reset()
					this.$router.push({name: 'thread', params: {boardName: response.boardName, threadId: response.threadId}})
				}).catch((error) => {
					log('Exception occurred while trying to submit post:', error)
				})
			},

			reset() {
				this.text = ''
				this.subject = ''
				this.files = []
				this.attachmentNSFW = []
				this.thumbs = []
			}
		},

		created() {
			this.handleDataUpdate(this.originalData)
			this.$bus.on(`modal-${this.$parent.$vnode.key}-data-update`, this.handleDataUpdate)
			this.$bus.on('captcha-solved', this.submit)
		}
	}
</script>

<style scoped>
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

	div {
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
	}

	#attachFile {
		width: 3rem;
	}

	.thumb button {
		opacity: 0;
		width: 50%;
		height: 100%;
	}

	.thumb:hover button {
		opacity: 1;
		filter: blur(0);
	}

	.nsfwToggle {
		background-color: #00c5;
	}

	.deleteAttachment {
		background-color: #c005;
	}
</style>