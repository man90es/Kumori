<template>
	<div class="modal" :style="style">
		<div :class="{draggable: draggable}" @mousedown="mouseDownHandler">
			{{header}}
			<button @click="close" v-if="closeable"><img class="icon" src="../../assets/icons/close.svg"></button>
		</div>
		<component :is="modalBody" :originalData="data" :parent="{key: $vnode.key, setParams, close}"></component>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cursorPosition: [null, null],
				position: [null, null],
				header: "Header",
				closeable: true,
				draggable: true,
				backdrop: false,
				style: ''
			}
		},
		props: [
			'modalBody',
			'data',
			'parent'
		],
		methods: {
			mouseDownHandler(event) {
				if (!this.draggable) return

				if (this.position.includes(null)) {
					let computedStyle = getComputedStyle(this.$el)

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

				let computedStyle = getComputedStyle(this.$el)
				let transform = [
					this.position[0] - parseInt(computedStyle.getPropertyValue('left')),
					this.position[1] - parseInt(computedStyle.getPropertyValue('top'))
				]
				this.style = `transform: translate(${transform[0]}px, ${transform[1]}px)`

				this.cursorPosition = [
					event.clientX, 
					event.clientY
				]
			},

			close() {
				if (this.backdrop) {
					this.parent.setBackdrop(false)
				}

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

				if ('backdrop' in params) {
					this.backdrop = params.backdrop
					this.parent.setBackdrop(params.backdrop)
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
		box-shadow: 0 0 var(--gap-size) #0005;
		padding: var(--gap-size);
		position: fixed;
	}

	.modal > div:first-child {
		height: 2rem;
		text-align: center;
		user-select: none;
	}

	.draggable {
		cursor: move;
	}

	.modal button{
		position: absolute;
		right: 0;
	}
</style>