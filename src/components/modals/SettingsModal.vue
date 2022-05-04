<template>
	<modal-shell :header="$t('settingsModal.header')">
		<div class="settings-grid">
			<label>
				{{ $t("settingsModal.lightTheme") }}
			</label>
			<toggle-switch :state="!!$store.state.theme" @click="themeChangeHandler" />

			<label v-if="landscape">
				{{ $t("settingsModal.compactBoardMenu") }}
			</label>
			<toggle-switch v-if="landscape" :state="$store.state.compactBoardMenu" @click="compactBoardMenuChangeHandler" />

			<label>
				{{ $t("settingsModal.repliesOnBoardPage") }}
			</label>
			<select v-model="repliesOnBoardPage" @change="repliesOnBoardPageChangeHandler">
				<option v-for="n in [0, 1, 2, 3, 4, 5]" :key="n" :value="n">
					{{ n }}
				</option>
			</select>

			<label>
				{{ $t("settingsModal.language") }}
			</label>
			<select v-model="language" @change="languageChangeHandler">
				<option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
					{{ $t(`settingsModal.language${capitalise(locale)}`) }}
				</option>
			</select>
		</div>
	</modal-shell>
</template>

<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"

	import { capitalise } from "../../utils"
	import { useViewMode } from "../../hooks/viewMode.js"
	import ModalShell from "./ModalShell.vue"
	import ToggleSwitch from "../misc/ToggleSwitch.vue"

	const store = useStore()
	const { landscape } = useViewMode()

	const repliesOnBoardPage = ref(store.state.repliesOnBoardPage)
	const language = ref(store.state.locale)

	function themeChangeHandler() {
		store.commit("toggleTheme")
	}

	function compactBoardMenuChangeHandler() {
		store.commit("toggleCompactBoardMenu")
	}

	function repliesOnBoardPageChangeHandler() {
		store.commit("setRepliesOnBoardPage", repliesOnBoardPage)
	}

	function languageChangeHandler() {
		store.commit("setLocale", language)
	}
</script>

<style lang="scss" scoped>
	.settings-grid {
		display: grid;
		grid-template-columns: 1fr 0.5fr 1fr;
		user-select: none;
		align-items: center;

		& > :not(label) {
			grid-column: 3;
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
		width: 10rem;
	}
</style>
