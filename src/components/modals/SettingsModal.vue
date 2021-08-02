<template>
	<Shell :header="$t('settingsModal.header')">
		<div>
			<span @click="() => $store.commit('toggleTheme')">
				{{ $t("settingsModal.lightTheme") }}
				<ToggleSwitch :state="!!$store.state.theme" />
			</span>
			<span @click="() => $store.commit('toggleCompactBoardMenu')">
				{{ $t("settingsModal.compactBoardMenu") }}
				<ToggleSwitch :state="$store.state.compactBoardMenu" />
			</span>
			<span>
				{{ $t("settingsModal.repliesOnBoardPage") }}
				<input type="number" min="0" max="5" v-model="repliesOnBoardPage" @input="() => $store.commit('setRepliesOnBoardPage', parseInt(repliesOnBoardPage))">
			</span>
		</div>
	</Shell>
</template>

<script>
	import ToggleSwitch from '../misc/ToggleSwitch.vue'
	import Shell from './Shell.vue'

	export default {
		name: 'SettingsModal',
		components: {
			ToggleSwitch,
			Shell
		},
		data() {
			return {
				repliesOnBoardPage: this.$store.state.repliesOnBoardPage
			}
		},
		methods: {
			close() {
				this.$parent.closeByKey(this._.vnode.key)
			},
		},
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
