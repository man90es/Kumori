<template>
	<div :class="{backdrop: backdrop}" id="ModalsLayer" v-if="modals.length > 0">
		<component v-for="(modal, i) in modals" :is="modal" v-bind="datas[i]" :key="keys[i]" />
	</div>
</template>

<script>
	import FormModal from '../modals/FormModal'
	import SearchModal from '../modals/SearchModal'
	import SettingsModal from '../modals/SettingsModal'
	import MediaModal from '../modals/MediaModal'
	import CaptchaModal from '../modals/CaptchaModal'
	import UnsafeLinkModal from '../modals/UnsafeLinkModal'
	import DeletePostModal from '../modals/DeletePostModal'

	export default {
		data() {
			return {
				modals: [],
				datas: [],
				keys: [],
				backdrop: false
			}
		},
		methods: {
			isOpen(modalBody) {
				return this.modals.includes(modalBody)
			},

			open(modalBody, data = {}) {
				this.modals.push(modalBody)
				this.datas.push(data)
				this.keys.push(+new Date)
			},

			passData(modalBody, data = {}) {
				let i = this.modals.indexOf(modalBody)
				this.datas[i] = data
			},

			closeByKey(key) {
				let i = this.keys.indexOf(key)

				if (i > -1) {
					this.modals.splice(i, 1)
					this.datas.splice(i, 1)
					this.keys.splice(i, 1)
				}
			},

			close(modalBody) {
				this.closeByKey(this.keys[this.modals.indexOf(modalBody)])
			},

			setBackdrop(state) {
				this.backdrop = state
			}
		},
		created() {
			emitter.on('menu-chat-button-click', (data) => {
				return this.isOpen(FormModal)
					? this.close(FormModal)
					: this.open(FormModal, data)
			})
			emitter.on('post-reply-button-click', (data) => {
				return this.isOpen(FormModal)
					? this.passData(FormModal, data)
					: this.open(FormModal, data)
			})
			emitter.on('menu-search-button-click', (data) => {
				return this.isOpen(SearchModal)
					? this.close(SearchModal)
					: this.open(SearchModal, data)
			})
			emitter.on('menu-settings-button-click', (data) => {
				return this.isOpen(SettingsModal)
					? this.close(SettingsModal)
					: this.open(SettingsModal, data)
			})
			emitter.on('post-attachment-preview-click', (data) => {
				return this.isOpen(MediaModal)
					? this.passData(MediaModal, data)
					: this.open(MediaModal, data)
			})
			emitter.on('unsafe-link-click', (data) => {
				return this.isOpen(UnsafeLinkModal)
					? this.passData(UnsafeLinkModal, data)
					: this.open(UnsafeLinkModal, data)
			})
			emitter.on('post-delete-button-click', (data) => {
				return this.isOpen(DeletePostModal)
					? this.passData(DeletePostModal, data)
					: this.open(DeletePostModal, data)
			})

			emitter.on('need-captcha', (data) => this.open(CaptchaModal, data))
		},
	}
</script>

<style scoped lang="scss">
	#ModalsLayer {
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		position: fixed;
		justify-content: center;
		align-items: center;
		display: flex;

		&:not(.backdrop) {
			pointer-events: none;
		}

		&.backdrop {
			background-color: #0005;

		}
	}
</style>
