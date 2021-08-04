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
			<span>
				{{ $t("settingsModal.language") }}
				<select v-model="language" @change="languageChangeHandler">
					<option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
						{{ $t(`settingsModal.language${capitalise(locale)}`) }}
					</option>
				</select>
			</span>
		</div>
	</Shell>
</template>

<script>
	import ToggleSwitch from '../misc/ToggleSwitch.vue'
	import Shell from './Shell.vue'
	import { capitalise } from "../../utils"

	export default {
		name: 'SettingsModal',
		components: {
			ToggleSwitch,
			Shell
		},
		data() {
			return {
				capitalise,
				repliesOnBoardPage: this.$store.state.repliesOnBoardPage,
				language: "en",
			}
		},
		methods: {
			close() {
				this.$parent.closeByKey(this._.vnode.key)
			},

			languageChangeHandler() {
				this.$i18n.locale = this.language
			}
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

	input[type="number"], select {
		margin: 0.3em 0;
	}
</style>
