<template>
	<modal-shell :header="$t('captchaModal.header')" :closeable="false" :draggable="false" :closeHandler="close">
		<form @submit.prevent="submit()" id="captcha-form">
			<img width="192" height="64" :src="imageSrc" @click="refresh">
			<input type="number" min="0" max="999999" autocomplete="off" :placeholder="$t('captchaModal.code')" v-model="code">
		</form>
	</modal-shell>
</template>

<script setup>
	import { ref, defineProps } from "vue"

	import ModalShell from "../misc/ModalShell.vue"

	import API from "../../api.js"

	const { closeHandler, setBackdrop } = defineProps({
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
		setBackdrop(false)
		closeHandler()
	}

	API.addListener( // Handle replies to captcha submission
		message => "checkCaptcha" === message.what?.request,
		(message) => {
			if (message.data.trustedPostCount > 0) {
				emitter.emit("captcha-solved", {})
				return close()
			}

			refresh()
		}
	)

	setBackdrop(true)
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
