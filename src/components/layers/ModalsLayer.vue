<template>
	<div id="ModalsLayer">
		<Modal v-if="modals.length > 0" v-for="modalBody in modals" :modalBody="modalBody" :key="modalBody.name" />
	</div>
</template>

<script>
	import Modal from '../misc/Modal'
	import FormModal from '../modals/FormModal'
	import SearchModal from '../modals/SearchModal'
	import StarredModal from '../modals/StarredModal'
	import SettingsModal from '../modals/SettingsModal'

	export default {
		data() {
			return {
				modals: []
			}
		},
		components: {
			Modal
		},
		methods: {
			toggle(modalBody) {
				let i = this.modals.indexOf(modalBody)

				if (i > -1) {
					this.modals.splice(i, 1)
				} else {
					this.modals.push(modalBody)
				}
			}
		},
		created() {
			this.$bus.on('menu-chat-button-click', () => this.toggle(FormModal))
			this.$bus.on('menu-search-button-click', () => this.toggle(SearchModal))
			this.$bus.on('menu-star-button-click', () => this.toggle(StarredModal))
			this.$bus.on('menu-settings-button-click', () => this.toggle(SettingsModal))
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