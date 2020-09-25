<template>
	<div>
		<span @click="() => $store.commit('toggleTheme')">
			Light theme
			<ToggleSwitch :state="!!$store.state.theme" />
		</span>
		<span @click="() => $store.commit('toggleCompactBoardMenu')">
			Compact board menu
			<ToggleSwitch :state="$store.state.compactBoardMenu" />
		</span>
		<span>
			Replies on board page <input type="number" min="0" max="5" v-model="repliesOnBoardPage" @input="() => $store.commit('setRepliesOnBoardPage', parseInt(repliesOnBoardPage))">
		</span>
	</div>
</template>

<script>
	import ToggleSwitch from '../misc/ToggleSwitch.vue'

	export default {
		name: 'SettingsModal',
		components: {
			ToggleSwitch
		},
		data() {
			return {
				repliesOnBoardPage: this.$store.state.repliesOnBoardPage
			}
		},
		created() {
			this.$parent.setParams({
				header: 'Settings'
			})
		}
	}
</script>

<style scoped>
	span {
		display: flex;
		width: 30rem;
		height: 2rem;
		justify-content: space-between;
		cursor: pointer;
	}

	input[type="number"] {
		width: 3rem;
	}
</style>