<template>
	<modal-shell :header="title">
		<div id="media-modal-body">
			<img v-if="!ready" class="icon placeholder" src="../../assets/icons/load.svg">
			<img :class="{ ready }" :src="src" @load="ready = true">
		</div>
	</modal-shell>
</template>

<script setup>
	import { ref, computed, defineProps } from "vue"

	import ModalShell from "./ModalShell.vue"

	import API from "../../api.js"

	const ready = ref(false)
	const { hash, mime } = defineProps({
		hash:  { type: String, required: true },
		mime:  { type: String, required: true },
		title: { type: String, required: true },
	})

	const src = computed(() => {
		return API.resPath + hash + ({
			"image/png": ".png",
			"image/jpeg": ".jpg",
			"image/gif": ".gif",
			"image/webp": ".webp"
		})[mime]
	})
</script>

<style scoped lang="scss">
	@keyframes spin {
		0% {
			transform:rotate(0deg) scale(-1, 1);
		}
		100% {
			transform:rotate(360deg) scale(-1, 1);
		}
	}

	#media-modal-body {
		min-width: 10em;
		min-height: 10em;
	}

	.placeholder {
		position: absolute;
		height: 5rem;
		top: calc(50% - 2.5rem);
		left: calc(50% - 2.5rem);
		animation-name: spin;
		animation-duration: 4000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	img {
		&:not(.placeholder):not(.ready){
			opacity: 0;
		}

		&.ready{
			max-width: 80vw;
			max-height: 80vh;
			width: auto;
			height: auto;
		}
	}
</style>
