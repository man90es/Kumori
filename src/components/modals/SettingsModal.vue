<template>
	<ModalShell header="Settings">
		<div class="settings-grid">
			<label>Light theme</label>
			<toggle-switch v-model="theme" />

			<label v-if="landscape">Compact board menu</label>
			<toggle-switch v-if="landscape" v-model="compactBoardMenu" />

			<label>Animations</label>
			<toggle-switch v-model="animations" />

			<label>Redirect to thread after replying</label>
			<toggle-switch v-model="noko" />

			<label>Replies on board page</label>
			<select v-model="repliesOnBoardPage">
				<option v-for="n in [0, 1, 2, 3, 4, 5]" :key="n" :value="n">
					{{ n }}
				</option>
			</select>

			<label>Debug mode</label>
			<toggle-switch v-model="debug" />
		</div>
	</ModalShell>
</template>

<script setup>
	import { ref, watch } from "vue"
	import { useStore } from "vuex"
	import { useViewMode } from "@/hooks/viewMode.js"
	import ModalShell from "@/components/misc/ModalShell.vue"
	import ToggleSwitch from "@/components/misc/ToggleSwitch.vue"

	const store = useStore()
	const { landscape } = useViewMode()

	const theme = ref(!!store.state.settings.theme)
	watch(
		() => theme.value,
		() => store.commit("updateSettings", { option: "theme" })
	)

	const compactBoardMenu = ref(store.state.settings.compactBoardMenu)
	watch(
		() => compactBoardMenu.value,
		() => store.commit("updateSettings", { option: "compactBoardMenu" })
	)

	const animations = ref(store.state.settings.animations)
	watch(
		() => animations.value,
		() => store.commit("updateSettings", { option: "animations" })
	)

	const noko = ref(store.state.settings.noko)
	watch(
		() => noko.value,
		() => store.commit("updateSettings", { option: "noko" })
	)

	const repliesOnBoardPage = ref(store.state.settings.repliesOnBoardPage)
	watch(
		() => repliesOnBoardPage.value,
		(nextValue) => store.commit("updateSettings", { option: "repliesOnBoardPage", nextValue })
	)

	const debug = ref(store.state.settings.debug)
	watch(
		() => debug.value,
		() => store.commit("updateSettings", { option: "debug" })
	)
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
