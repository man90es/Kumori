<template>
	<div id='board'>
		<NavBar :boards='boards' />
		<MainSection>
			<PageHeader :title='$route.params.boardID' />
			<Thread :key='thread.number' :thread='thread' v-for='thread in threads'/>
		</MainSection>
		<MenuBar />
	</div>
</template>

<script>
	import API from '../api'
	
	import MainSection from '../components/layout/MainSection.vue'
	import NavBar from '../components/layout/NavBar.vue'
	import MenuBar from '../components/layout/MenuBar.vue'
	import PageHeader from '../components/misc/PageHeader.vue'
	import Thread from '../components/misc/Thread.vue'

	export default {
		name: 'Board',
		components: {
			MainSection,
			NavBar,
			MenuBar,
			PageHeader,
			Thread
		},
		props: ["boards"],
		data() {
			return {
				threads: []
			}
		},
		created() {
			API.readThreads('Default', this.$route.params.boardID, (data) => this.threads = data.threads)
		}
	}
</script>

<style scoped>
	#board{
		display: flex;
		justify-content: center;
		width: 100vw;
	}
</style>
