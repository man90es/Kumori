<template>
	<div id='board'>
		<NavBar :boards='boards' :siteTitle='siteTitle' />
		<MainSection :board='board'>
			<Thread :key='thread.number' :thread='thread' :defaultSubject='board.defaultSubject' v-for='thread in threads'/>
		</MainSection>
		<MenuBar />
	</div>
</template>

<script>
	import API from '../api'
	
	import MainSection from '../components/layout/MainSection.vue'
	import NavBar from '../components/layout/NavBar.vue'
	import MenuBar from '../components/layout/MenuBar.vue'
	import Thread from '../components/misc/Thread.vue'

	export default {
		name: 'Board',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			Thread
		},
		props: [
			'boards',
			'siteTitle'
		],
		data() {
			return {
				threads: [],
				board: {}
			}
		},
		methods: {
			fetchThreads(boardId) {
				API.readThreads('Default', boardId, (data) => {
					this.board = this.boards.filter((board) => board.id === boardId)[0]
					this.threads = data.threads
				})
			}
		},
		watch: {
			$route(to) {
				this.fetchThreads(to.params.boardId)
			}
		},
		created() {
			this.fetchThreads(this.$route.params.boardId)
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
