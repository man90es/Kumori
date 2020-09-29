<template>
	<div>
		<img v-if="!ready" class="icon placeholder" src="../../assets/icons/load.svg">
		<img :class="{ready}" :src="src" @load="ready = true">
	</div>
</template>

<script>
	import { meta } from '../../api/request.js'

	export default {
		name: 'MediaModal',
		props: [
			'originalData'
		],
		data() {
			return {
				ready: false
			}
		},
		computed: {
			src() {
				const mimeMap = {
					'image/png': '.png',
					'image/jpeg': '.jpg',
					'image/gif': '.gif',
					'image/webp': '.webp'
				}

				return meta.res + this.originalData.hash + mimeMap[this.originalData.mime]
			}
		},
		mounted() {
			this.$parent.setParams({
				header: this.originalData.title
			})
		}
	}
</script>

<style scoped>
	@keyframes spin {
		0% {
			transform:rotate(0deg) scale(-1, 1);
		}
		100% {
			transform:rotate(360deg) scale(-1, 1);
		}
	}

	div{
		height: 100%;
	}

	.placeholder{
		position: absolute;
		height: 5rem;
		top: calc(50% - 2.5rem);
		left: calc(50% - 2.5rem);
		animation-name: spin;
		animation-duration: 4000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	img:last-child:not(.ready){
		opacity: 0;
	}

	img.ready{
		max-width: 80vw;
		max-height: 80vh;
		width: auto;
		height: auto;
	}
</style>