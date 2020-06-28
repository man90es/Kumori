<template>
	<div class="modal" :style="{transform: `translate(${transform[0]}px, ${transform[1]}px)`}" ref="modal">
		<div @mousedown="mouseDownHandler">{{header}}<button @click="close"><img class='icon' src='../../assets/icons/close.svg'></button></div>
		<component :is="modalBody" :data="data" :parent="{setHeader}"></component>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				transform: [0, 0],
				cursorPosition: [null, null],
				position: [null, null],
				header: "Header"
			}
		},
		props: [
			'modalBody',
			'data'
		],
		methods: {
			mouseDownHandler(event) {
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
				document.removeEventListener('mousemove', this.dragHandler)
				document.removeEventListener('mouseup', this.mouseUpHandler)
			},

			dragHandler(event) {
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
				this.$bus.emit('modal-close-button-click', {key: this.$vnode.key})
			},

			setHeader(header) {
				this.header = header
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
		min-height: 10em;
		min-width: 10em;
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