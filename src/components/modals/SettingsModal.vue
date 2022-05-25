<template>
	<modal-shell :header="$t('settingsModal.header')">
		<div class="settings-grid">
			<label>
				{{ $t("settingsModal.lightTheme") }}
			</label>
			<toggle-switch v-model="theme"/>

			<label v-if="landscape">
				{{ $t("settingsModal.compactBoardMenu") }}
			</label>
			<toggle-switch v-if="landscape" v-model="compactBoardMenu" />

			<label>
				{{ $t("settingsModal.animations") }}
			</label>
			<toggle-switch v-model="animations" />

			<label>
				{{ $t("settingsModal.noko") }}
			</label>
			<toggle-switch v-model="noko" />

			<label>
				{{ $t("settingsModal.repliesOnBoardPage") }}
			</label>
			<select v-model="repliesOnBoardPage">
				<option v-for="n in [0, 1, 2, 3, 4, 5]" :key="n" :value="n">
					{{ n }}
				</option>
			</select>

			<label>
				{{ $t("settingsModal.language") }}
			</label>
			<select v-model="language">
				<option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
					{{ $t(`settingsModal.language${capitalise(locale)}`) }}
				</option>
			</select>

			<label>
				{{ $t("settingsModal.debug") }}
			</label>
			<toggle-switch v-model="debug" />
		</div>
	</modal-shell>
</template>

<script setup>
	import { ref, watch } from "vue"
	import { useStore } from "vuex"

	import { capitalise } from "../../utils"
	import { useViewMode } from "../../hooks/viewMode.js"
	import ModalShell from "../misc/ModalShell.vue"
	import ToggleSwitch from "../misc/ToggleSwitch.vue"

	const store = useStore()
	const { landscape } = useViewMode()

	const theme = ref(!!store.state.settings.theme)
	watch(() => theme.value, () => store.commit("updateSettings", { option: "theme" }))

	const compactBoardMenu = ref(store.state.settings.compactBoardMenu)
	watch(() => compactBoardMenu.value, () => store.commit("updateSettings", { option: "compactBoardMenu" }))

	const animations = ref(store.state.settings.animations)
	watch(() => animations.value, () => store.commit("updateSettings", { option: "animations" }))

	const noko = ref(store.state.settings.noko)
	watch(() => noko.value, () => store.commit("updateSettings", { option: "noko" }))

	const repliesOnBoardPage = ref(store.state.settings.repliesOnBoardPage)
	watch(() => repliesOnBoardPage.value, nextValue => store.commit("updateSettings", { option: "repliesOnBoardPage", nextValue }))

	const language = ref(store.state.settings.locale)
	watch(() => language.value, nextValue => store.commit("updateSettings", { option: "locale", nextValue }))

	const debug = ref(store.state.settings.debug)
	watch(() => debug.value, () => store.commit("updateSettings", { option: "debug" }))
</script>

<style lang="scss" scoped>
	.settings-grid {
		align-items: center;
		display: grid;
		grid-gap: 0 1em;
		grid-template-columns: auto auto;
		user-select: none;

		& > :not(label) {
			cursor: pointer;
			height: 2em;
			justify-self: right;
		}
	}

	select {
		background-color: var(--background-color);
		border: none;
		color: var(--text-color);
		margin: 0.3em 0;
		outline: none;
		padding: 0;
		width: 10em;
	}
</style>
