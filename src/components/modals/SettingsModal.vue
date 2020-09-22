<template>
	<div>
		<span @click="() => $store.commit('toggleTheme')">
			Toggle theme <div id="themeCheckbox"></div>
		</span>
		<span>
			Replies on board page <input type="number" min="0" max="5" v-model="repliesOnBoardPage" @input="() => $store.commit('setRepliesOnBoardPage', parseInt(repliesOnBoardPage))">
		</span>
	</div>
</template>

<script>
	export default {
		name: 'SettingsModal',
		props: [
			'parent'
		],
		data() {
			return {
				repliesOnBoardPage: this.$store.state.repliesOnBoardPage
			}
		},
		created() {
			this.parent.setParams({
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

	#themeCheckbox {
		background-color: var(--alternative-theme-representative-color);
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
	}

	input[type="number"] {
		width: 3rem;
	}
</style>