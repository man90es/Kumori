<template>
	<div id='board'>
		<NavBar />
		<MainSection>
			<Thread :key='id' :thread='thread' v-for='(thread, id) in threads'/>
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
		methods: {
			getThreads(boardName) {
				this.$store.dispatch('updateThreadsList', {boardName, amount: 10, page: 0})
			}
		},
		watch: {
			$route(to) {
				this.getThreads(to.params.boardName)
			}
		},
		created() {
			this.getThreads(this.$route.params.boardName)
		},
		computed: {
			threads: function() {
				return this.$store.state.threads
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
