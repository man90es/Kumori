<template>
	<div id="ModalsLayer">
		<div v-if="modals.length > 0" v-for="(modal, index) in modals" :key="index">
			<div>Header</div>
			<component :is="modal"></component>
		</div>
	</div>
</template>

<script>
	import FormModal from '../misc/FormModal'

	export default {
		data() {
			return {
				modals: []
			}
		},
		methods: {
			toggle(modal) {
				let i = this.modals.indexOf(modal)

				if (i > -1) {
					this.modals.splice(i, 1)
				} else {
					this.modals.push(modal)
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

	#ModalsLayer > * {
		pointer-events: auto;
		height: 25vh;
		width: 50vh;
		background-color: #282c34;
		box-shadow: 0 0 10px #0008;
		padding: 0.5rem;
	}

	#ModalsLayer > * > div {
		height: 2rem;
		text-align: center;
	}
</style>