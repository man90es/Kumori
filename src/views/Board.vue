<template>
	<div id="board">
		<NavBar />
		<MainSection>
			<Thread :key="thread.id" :thread="thread" :pageSize="$store.state.repliesOnBoardPage" :tail="true" v-for="thread in $store.state.threads"/>
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
		methods: {
			requestThreads(boardName) {
				requestThreads({boardName, count: 10, page: 0})
			}
		},
		watch: {
			$route(to) {
				this.requestThreads(to.params.boardName)
			}
		},
		created() {
			this.requestThreads(this.$route.params.boardName)
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
