<template>
	<div id="ModalsLayer">
		<Modal v-if="modals.length > 0" v-for="(modalBody, i) in modals" :modalBody="modalBody" :data="datas[i]" :key="keys[i]" />
	</div>
</template>

<script>
	import Modal from '../misc/Modal'
	import FormModal from '../modals/FormModal'
	import SearchModal from '../modals/SearchModal'
	import StarredModal from '../modals/StarredModal'
	import SettingsModal from '../modals/SettingsModal'
	import MediaModal from '../modals/MediaModal'

	export default {
		data() {
			return {
				modals: [],
				datas: [],
				keys: []
			}
		},
		components: {
			Modal
		},
		methods: {
			toggle(modalBody, data, reopen = false) {
				let i = this.modals.indexOf(modalBody)

				if (i > -1) {
					this.modals.splice(i, 1)
					this.datas.splice(i, 1)
					this.keys.splice(i, 1)

					if (!reopen) return
				} 

				this.modals.push(modalBody)
				this.datas.push(data)
				this.keys.push(+new Date)
			},
		},
		created() {
			this.$bus.on('menu-chat-button-click', (data) => this.toggle(FormModal, data))
			this.$bus.on('menu-search-button-click', (data) => this.toggle(SearchModal, data))
			this.$bus.on('menu-star-button-click', (data) => this.toggle(StarredModal, data))
			this.$bus.on('menu-settings-button-click', (data) => this.toggle(SettingsModal, data))
			this.$bus.on('post-attachment-preview-click', (data) => this.toggle(MediaModal, data, true))
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
		pointer-events: none;
	}
</style>