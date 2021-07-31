<template>
	<Shell :header="'Humanity check'" :closeable="false" :draggable="false">
		<form @submit.prevent="submit()">
			<img width="192" height="64" :src="imageSrc" @click="refresh">
			<input type="text" name="code" autocomplete="off" placeholder="Captcha" v-model="code">
		</form>
	</Shell>
</template>

<script>
	import API from '../../api'
	import Shell from './Shell.vue'

	export default {
		name: 'CaptchaModal',
		components: {
			Shell
		},
		data() {
			return {
				imageSrc: null,
				code: ''
			}
		},
		methods: {
			submit() {
				API.captcha.validate({ code: this.code })
			},

			refresh() {
				this.imageSrc = API.captcha.imageURI
			},

			close() {
				this.$parent.setBackdrop(false)
				this.$parent.closeByKey(this._.vnode.key)
			},
		},
		created() {
			// Handle reply to captcha submission
			API.addListener(
				message => 'checkCaptcha' === message.what?.request,
				(message) => {
					if (message.data.trustedPostCount > 0) {
						emitter.emit('captcha-solved', {})
						this.$parent.close()
					} else {
						this.refresh()
					}
				}
			)

			this.$parent.setBackdrop(true)
			this.refresh()
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
