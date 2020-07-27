<template>
	<div class="modal" :style="{transform: `translate(${transform[0]}px, ${transform[1]}px)`}" ref="modal">
		<div @mousedown="mouseDownHandler">{{header}}<button @click="close" v-if="closeable"><img class='icon' src='../../assets/icons/close.svg'></button></div>
		<component :is="modalBody" :originalData="data" :parent="{key: $vnode.key, setParams, close}"></component>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				transform: [0, 0],
				cursorPosition: [null, null],
				position: [null, null],
				header: "Header",
				closeable: true,
				draggable: true,
				blocking: false
			}
		},
		props: [
			'modalBody',
			'data'
		],
		methods: {
			mouseDownHandler(event) {
				if (!this.draggable) return

				if (this.position.includes(null)) {
					let computedStyle = getComputedStyle(this.$refs.modal)

					this.position = [
						parseInt(computedStyle.getPropertyValue('left')) || 0, 
						parseInt(computedStyle.getPropertyValue('top')) || 0
					]
				}

				this.cursorPosition = [event.clientX, event.clientY]
				document.addEventListener('mousemove', this.dragHandler)
				document.addEventListener('mouseup', this.mouseUpHandler.bind(this))
			},

			mouseUpHandler() {
				if (!this.draggable) return
				document.removeEventListener('mousemove', this.dragHandler)
				document.removeEventListener('mouseup', this.mouseUpHandler)
			},

			dragHandler(event) {
				if (!this.draggable) return

				this.position = [
					this.position[0] + event.clientX - this.cursorPosition[0], 
					this.position[1] + event.clientY - this.cursorPosition[1]
				]

				let computedStyle = getComputedStyle(this.$refs.modal)
				this.transform = [
					this.position[0] - parseInt(computedStyle.getPropertyValue('left')),
					this.position[1] - parseInt(computedStyle.getPropertyValue('top'))
				]

				this.cursorPosition = [
					event.clientX, 
					event.clientY
				]
			},

			close() {
				this.$bus.emit('modal-close-button-click', this.$vnode.key)
			},

			setParams(params) {
				if ('header' in params) {
					this.header = params.header
				}

				if ('closeable' in params) {
					this.closeable = params.closeable
				}

				if ('draggable' in params) {
					this.draggable = params.draggable
				}

				if ('blocking' in params) {
					this.blocking = params.blocking
				}
			}
		},

		mounted() {
			this.position = [null, null]
		}
	}
</script>

<style scoped>
	.modal {
		pointer-events: auto;
		min-height: 5em;
		min-width: 5em;
		background-color: var(--card-color);
		box-shadow: 0 0 calc(var(--gap-size) / 2) #0005;
		padding: calc(var(--gap-size) / 2);
		position: fixed;
	}

	.modal > div {
		height: 2rem;
		text-align: center;
		user-select: none;
		cursor: move;
	}

	.modal button{
		position: absolute;
		right: 0;
	}
</style>