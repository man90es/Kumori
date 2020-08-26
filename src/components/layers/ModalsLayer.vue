<template>
	<div :class="{backdrop: backdrop}" id="ModalsLayer" v-if="modals.length > 0">
		<Modal v-for="(modalBody, i) in modals" :modalBody="modalBody" :data="datas[i]" :key="keys[i]" :parent="{setBackdrop}" />
	</div>
</template>

<script>
	import Modal from '../misc/Modal'
	import FormModal from '../modals/FormModal'
	import SearchModal from '../modals/SearchModal'
	import StarredModal from '../modals/StarredModal'
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
		components: {
			Modal
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

				this.modals.splice(i, 1)
				this.datas.splice(i, 1)
				let key = this.keys.splice(i, 1)[0]
				
				this.modals.push(modalBody)
				this.datas.push(data)
				this.keys.push(key)

				this.$bus.emit(`modal-${this.keys[this.modals.indexOf(modalBody)]}-data-update`, data)
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
			this.$bus.on('menu-chat-button-click', (data) => this.isOpen(FormModal) ? this.close(FormModal) : this.open(FormModal, data))
			this.$bus.on('post-reply-button-click', (data) => this.isOpen(FormModal) ? this.passData(FormModal, data) : this.open(FormModal, data))
			this.$bus.on('menu-search-button-click', (data) => this.isOpen(SearchModal) ? this.close(SearchModal) : this.open(SearchModal, data))
			this.$bus.on('menu-star-button-click', (data) => this.isOpen(StarredModal) ? this.close(StarredModal) : this.open(StarredModal, data))
			this.$bus.on('menu-settings-button-click', (data) => this.isOpen(SettingsModal) ? this.close(SettingsModal) : this.open(SettingsModal, data))
			this.$bus.on('post-attachment-preview-click', (data) => this.isOpen(MediaModal) ? this.passData(MediaModal, data) : this.open(MediaModal, data))
			this.$bus.on('unsafe-link-click', (data) => this.isOpen(UnsafeLinkModal) ? this.passData(UnsafeLinkModal, data) : this.open(UnsafeLinkModal, data))
			this.$bus.on('post-delete-button-click', (data) => this.isOpen(DeletePostModal) ? this.passData(DeletePostModal, data) : this.open(DeletePostModal, data))

			this.$bus.on('need-captcha', (data) => this.open(CaptchaModal, data))

			this.$bus.on('modal-close-button-click', this.closeByKey)
		},
	}
</script>

<style scoped>
	#ModalsLayer {
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		position: fixed;
		justify-content: center;
		align-items: center;
		display: flex;
	}

	#ModalsLayer:not(.backdrop) {
		pointer-events: none;
	}

	.backdrop {
		background-color: #0005;
	}
</style>