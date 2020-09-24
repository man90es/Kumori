<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<Thread :key="threadId" :threadId="threadId" :pageSize="$store.state.repliesOnBoardPage" v-for="threadId in threadList"/>
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
		name: 'Board',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			ModalsLayer,
			Thread
		},
		computed: {
			threadList() {
				return this.$store.state.threadLists[this.$route.params.boardName]
			}
		},
		methods: {
			requestThreads() {
				if (this.threadList == undefined) {
					this.$store.dispatch('requestThreadList', {boardName: this.$route.params.boardName, count: 10, page: 0})
				}
			}
		},
		watch: {
			$route() {
				this.requestThreads()
			}
		},
		created() {
			this.requestThreads()
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
