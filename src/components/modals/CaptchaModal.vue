<template>
	<ModalShell header="Humanity check" :closeable="false" :draggable="false" :closeHandler="close">
		<form @submit.prevent="submit()" id="captcha-form">
			<img width="192" height="64" :src="imageSrc" @click="refresh" />
			<input autocomplete="off" max="999999" min="0" placeholder="Captcha" type="number" v-model="code" />
		</form>
	</ModalShell>
</template>

<script setup>
	import { ref } from "vue"
	import API from "@/api"
	import ModalShell from "@/components/misc/ModalShell"

	const props = defineProps({
		closeHandler: {
			type: Function,
			required: true,
		},
		setBackdrop: {
			type: Function,
			required: true,
		},
	})
	const imageSrc = ref(null)
	const code = ref("")

	function submit() {
		API.captcha.validate({ code })
	}

	function refresh() {
		imageSrc.value = API.captcha.imageURI
	}

	function close() {
		props.setBackdrop(false)
		props.closeHandler()
	}

	// Handle replies to captcha submission
	API.addInMessageListener(
		({ what }) => "checkCaptcha" === what.request,
		({ data }) => {
			if (data.trustedPostCount > 0) {
				window.emitter.emit("captcha-solved", {})
				return close()
			}

			refresh()
		}
	)

	props.setBackdrop(true)
	refresh()
</script>

<style lang="scss">
	#captcha-form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		img {
			margin-bottom: 1em;
			cursor: pointer;
		}

		input {
			border: none;
			padding: 2%;
			background-color: var(--background-color);
			color: var(--text-color);
			text-align: center;
			font-size: 1rem;
			width: 100%;
		}
	}
</style>
