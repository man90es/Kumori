<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<Thread v-if="$store.getters.getCurrentThread" :thread="$store.getters.getCurrentThread" :pageSize="500" :tail="false" />
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
	import { requestThread } from '../api'

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
				requestThread({id})
			}
		},
		watch: {
			$route(to) {
				this.requestThread(to.params.threadId)

			}
		},
		created() {
			this.requestThread(this.$route.params.threadId)
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
