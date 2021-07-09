<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<Thread :threadId="parseInt($route.params.threadId)" :pageSize="500" :tail="false" />
		</MainSection>
		<MenuBar />

		<ModalsLayer />
	</div>
</template>

<script>
	import MainSection from '../components/layout/MainSection.vue'
	import NavBar from '../components/layout/NavBar.vue'
	import MenuBar from '../components/layout/MenuBar.vue'
	import ModalsLayer from '../components/layers/ModalsLayer.vue'
	import Thread from '../components/misc/Thread.vue'

	export default {
		name: 'SingleThread',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			ModalsLayer,
			Thread
		},
		methods: {
			requestThread(id) {
				if (this.$store.state.threads[id] == undefined) {
					this.$store.dispatch('requestThread', {id})
				}
			}
		},
		created() {
			this.requestThread(parseInt(this.$route.params.threadId))
		}
	}
</script>

<style>
	#board{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
