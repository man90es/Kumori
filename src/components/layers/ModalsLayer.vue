<template>
	<div id="ModalsLayer">
		<Modal v-if="modals.length > 0" v-for="(modalBody, index) in modals" :modalBody="modalBody" :key="index" />
	</div>
</template>

<script>
	import Modal from '../misc/Modal'
	import FormModal from '../modals/FormModal'

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
		},
	}
</script>

<style scoped>
	#ModalsLayer {
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		position: fixed;
		justify-content: center;
		align-items: center;
		display: flex;
		pointer-events: none;
	}
</style>