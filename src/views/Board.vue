<template>
	<div id="board">
		<NavBar />
		<MainSection :type="'board'">
			<Thread :key="thread.id" :thread="thread" v-for="thread in filteredThreads"/>
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
	import { requestThreads } from '../api'

	export default {
		name: 'Board',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			ModalsLayer,
			Thread
		},
		data() {
			return {
				boardName: null
			}
		},
		methods: {
			requestThreads() {
				requestThreads({boardName: this.boardName, count: 10, page: 0})
			}
		},
		watch: {
			$route(to) {
				this.boardName = to.params.boardName 
				this.requestThreads()
			}
		},
		created() {
			this.boardName = this.$route.params.boardName
			this.requestThreads()
		},
		computed: {
			filteredThreads: function () {
				return this.$store.state.threads.filter((thread) => thread.boardName == this.boardName)
			}
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
