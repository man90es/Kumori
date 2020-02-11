<template>
	<div class="modal" :style="{transform: `translate(${transform[0]}px, ${transform[1]}px)`}" ref="modal">
		<div @mousedown="mouseDownHandler" @mouseup="mouseUpHandler">Header</div>
		<component :is="modalBody"></component>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				transform: [0, 0],
				cursorPosition: [null, null],
				position: [null, null],
				initialPosition: [null, null]
			}
		},
		props: [
			'modalBody',
		],
		methods: {
			mouseDownHandler(event) {
				this.cursorPosition = [event.clientX, event.clientY]
				document.addEventListener('mousemove', this.dragHandler)
			},

			mouseUpHandler(event) {
				document.removeEventListener('mousemove', this.dragHandler)
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
			}
		},
		mounted() {
			let computedStyle = getComputedStyle(this.$refs.modal)
			
			this.initialPosition = [
				parseInt(computedStyle.getPropertyValue('left')) || 0, 
				parseInt(computedStyle.getPropertyValue('top')) || 0
			]

			this.position = this.initialPosition
		}
	}
</script>

<style>
	.modal {
		pointer-events: auto;
		height: 25vh;
		width: 50vh;
		background-color: #282c34;
		box-shadow: 0 0 0.5rem #0005;
		padding: 0.5rem;
		position: fixed;
	}

	.modal > div {
		height: 2rem;
		text-align: center;
		user-select: none;
		cursor: move;
	}
</style>