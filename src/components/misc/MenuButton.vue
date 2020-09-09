<template>
	<button @click="dispatchEvent">
		<img class="icon" :src="src">
	</button>
</template>

<script>
	export default {
		name: 'MenuButton',
		props: ['icon'],
		methods: {
			dispatchEvent() {
				switch(this.icon) {
					case 'chat':
						let thread = this.$store.getters.getThread(this.$route.params.threadId)
						this.$bus.emit(`menu-${this.icon}-button-click`, {
							boardName: this.$route.params.boardName, 
							threadNumber: thread ? thread.head.number : null
						})
						break
					
					case 'star':
						this.$router.push({name: 'bookmarks'})
						break

					case 'home':
						this.$router.push({name: 'home'})
						break

					case 'up':
						scrollTo({top: 0, behavior: 'smooth'})
						break

					case 'down':
						scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
						break
					
					default:
						this.$bus.emit(`menu-${this.icon}-button-click`, {})
				}
			}
		},
		computed: {
			src() {
				let images = require.context('../../assets/icons', false, /\.svg$/)
				return images(`./${this.icon}.svg`)
			},
		}
	}
</script>

<style scoped>
	button{
		height: 3.5rem;
		width: 3.5rem;
		justify-content: center;
		align-items: center;
		display: flex;
		background-color: var(--card-color);
		border: none;
	}
</style>
