<template>
	<img :src="`https://foxtan.tumba.ch/res/${data.path}`" :style="style" ref="img">
</template>

<script>
	export default {
		name: 'MediaModal',
		props: [
			'data'
		],
		data() {
			return {
				style: {
					'max-width': '80vw',
					'max-height': '80vh',
					'width': 'auto',
					'height': 'auto'
				}
			}
		},
		mounted() {
			let computedStyle = getComputedStyle(this.$refs.img)

			try {
				this.style.width = computedStyle.getPropertyValue(width)
			} catch { }

			try {
				this.style.height = computedStyle.getPropertyValue(height)
			} catch { }
		}
	}
</script>