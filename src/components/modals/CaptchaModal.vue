<template>
	<form @submit.prevent="submit()">
		<img width="192" height="64" :src="imageSrc">
		<input type="text" name="code" autocomplete="off" placeholder="Captcha">
	</form>
</template>

<script>
	import { getCaptchaImageURI, submitCaptcha } from '../../api'

	export default {
		name: 'CaptchaModal',
		data() {
			return {
				imageSrc: null
			}
		},
		methods: {
			async submit() {
				await submitCaptcha(new FormData(this.$el)).then((response) => {
					if (response.trustedPostCount > 0) {
						this.$bus.emit('captcha-solved', {})
						this.$parent.close()
					} else {
						this.refresh()
					}
				})
			},

			refresh() {
				this.imageSrc = getCaptchaImageURI()
			}
		},

		created() {
			this.imageSrc = getCaptchaImageURI()
			this.$parent.setParams({
				header: 'Humanity check',
				closeable: false,
				draggable: false,
				backdrop: true
			})

			this.submit()
		}
	}
</script>

<style scoped>
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	img {
		margin-bottom: 1em;
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
</style>