<template>
	<ModalShell header="Captcha" :closeable="false" :draggable="false" :closeHandler="close">
		<form @submit.prevent="submit()" id="captcha-form">
			<img width="192" height="64" :src="captcha.src" @click="refresh" />
			<input
				:max="captcha.max"
				:min="captcha.min"
				:type="captcha.type"
				autocomplete="off"
				placeholder="Code"
				v-model="captcha.code"
			/>
		</form>
	</ModalShell>
</template>

<script setup>
	import { reactive, watch } from "vue"
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

	const captcha = reactive({
		code: "",
		max: 10 ** API.captcha.size.max - 1,
		min: 0,
		src: null,
		timestamp: 0,
		type: API.captcha.type,
	})

	function refresh() {
		captcha.timestamp = Number(new Date())
	}

	function submit() {
		API.captcha.validate(captcha)
	}

	watch(() => captcha.timestamp, () => {
		captcha.code = ""
		captcha.src = API.captcha.getImageURI(captcha)
	})

	function close() {
		props.setBackdrop(false)
		props.closeHandler()
	}

	// Handle replies to captcha submission
	API.addInMessageListener(
		({ what }) => "checkCaptcha" === what?.request,
		({ data }) => data.trustedPostCount > 0 && close()
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
