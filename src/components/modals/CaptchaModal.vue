<template>
	<Shell :header="'Humanity check'" :closeable="false" :draggable="false">
		<form @submit.prevent="submit()">
			<img width="192" height="64" :src="imageSrc" @click="refresh">
			<input type="text" name="code" autocomplete="off" placeholder="Captcha">
		</form>
	</Shell>
</template>

<script>
	import { getCaptchaImageURI, submitCaptcha } from '../../api'
	import Shell from './Shell.vue'

	export default {
		name: 'CaptchaModal',
		components: {
			Shell
		},
		data() {
			return {
				imageSrc: null
			}
		},
		methods: {
			async submit() {
				await submitCaptcha(new FormData(this.$el)).then((response) => {
					if (response.trustedPostCount > 0) {
						emitter.emit('captcha-solved', {})
						this.$parent.close()
					} else {
						this.refresh()
					}
				})
			},

			refresh() {
				this.imageSrc = getCaptchaImageURI()
			},

			close() {
				this.$parent.setBackdrop(false)
				this.$parent.closeByKey(this._.vnode.key)
			},
		},
		created() {
			this.$parent.setBackdrop(true)
			this.imageSrc = getCaptchaImageURI()
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
