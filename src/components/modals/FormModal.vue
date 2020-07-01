<template>
	<form>
		<img class="icon" :class="{active: sage}" src="../../assets/icons/down.svg" @click="sage = !sage">
		<img class="icon" :class="{active: op}" src="../../assets/icons/trip_origin.svg" @click="op = !op">
		<img class="icon" :class="{active: user}" src="../../assets/icons/person_pin.svg" @click="user = !user">
		<input type="text">
		
		<textarea v-model="text"></textarea>

		<div id="attachmentsForm">
			<button type="button" id="attachFile" @click="attachHandler" v-if="files.length < fileLimit">
				<img class="icon" src="../../assets/icons/attach_file.svg">
			</button>

			<div class="thumb" :key="i" v-for="(file, i) in files" :style="`background-image:url(${thumbs[i]})`">
				<button class="nsfwToggle" type="button" @click="toggleAttachmentNSFW(i)">
					<img class="icon" v-if="attachmentNSFW[i]" src="../../assets/icons/nsfw.svg">
					<img class="icon" v-else src="../../assets/icons/sfw.svg">
				</button>
				<button class="deleteAttachment" type="button" @click="deleteAttachment(i)"><img class="icon" src="../../assets/icons/close.svg"></button>
			</div>
		</div>

		<button type="button" id="submit">
			<img class="icon" src="../../assets/icons/send.svg">
		</button>
	</form>
</template>

<script>
	export default {
		name: 'FormModal',
		props: [
			'originalData',
			'parent'
		],
		data() {
			return {
				sage: false,
				op: false,
				user: false,
				text: '',
				files: [],
				attachmentNSFW: [],
				thumbs: [],
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
				this.updatedData = data

				this.parent.setHeader(data.threadId ? `Reply to thread ${data.threadId}` : `New thread on ${data.boardName} board`)

				if (data.postId) {
					this.text += `>>${data.postId}\r`
				}
			}
		},

		computed: {
			data() {
				return updatedData || originalData
			}
		},

		created() {
			this.handleDataUpdate(this.originalData)
			this.$bus.on(`modal-${this.parent.key}-data-update`, this.handleDataUpdate)
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
		margin-top: calc(var(--gap-size) / 2);
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
	}

	.icon:not(.active) {
		opacity: 0.5;
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