<template>
	<ModalShell header="Settings">
		<div class="settings-grid">
			<label v-for="item of items" :key="item.key">
				<span>{{ item.label }}</span>
				<ToggleSwitch
					:modelValue="settings[item.key]"
					@update:modelValue="(v) => updateItem(item.key, item.type(v))"
					v-if="'checkbox' === item.inputType"
				/>
				<select
					:value="settings[item.key]"
					@change="({ target: t }) => updateItem(item.key, item.type(t.value))"
					v-else-if="'select' === item.inputType"
				>
					<option v-for="option of item.options" :key="option" :value="option">
						{{ option }}
					</option>
				</select>
			</label>
		</div>
	</ModalShell>
</template>

<script setup>
	import { useSettingsStore } from "@/stores/settings"
	import ModalShell from "@/components/misc/ModalShell"
	import ToggleSwitch from "@/components/misc/ToggleSwitch"

	const settings = useSettingsStore()

	const items = [
		{
			inputType: "select",
			key: "theme",
			label: "Theme",
			options: ["Dark", "Light"],
			type: String,
		},
		{
			inputType: "checkbox",
			key: "compactBoardMenu",
			label: "Compact board menu",
			type: Boolean,
		},
		{
			inputType: "checkbox",
			key: "animations",
			label: "Animations",
			type: Boolean,
		},
		{
			inputType: "checkbox",
			key: "noko",
			label: "Redirect to thread after replying",
			type: Boolean,
		},
		{
			inputType: "select",
			key: "repliesOnBoardPage",
			label: "Replies on board page",
			options: [0, 1, 2, 3, 4, 5],
			type: Number,
		},
		{
			inputType: "checkbox",
			key: "debug",
			label: "Debug mode",
			type: Boolean,
		},
	]

	function updateItem(key, value) {
		settings.$patch({ [key]: value })
	}
</script>

<style lang="scss" scoped>
	.settings-grid {
		align-items: center;
		display: grid;
		user-select: none;

		label {
			align-items: center;
			display: flex;
			gap: 1em;
			justify-content: space-between;

			& > :not(span) {
				cursor: pointer;
				height: 2em;
				justify-self: right;
			}
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
