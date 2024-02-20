<template>
	<ModalShell header="Settings">
		<label :className="$style.label" v-for="item of items" :key="item.key">
			<span>{{ item.label }}</span>
			<ToggleSwitch :modelValue="settings[item.key]" @update:modelValue="(v) => updateItem(item.key, item.type(v))" v-if="'checkbox' === item.inputType" />
			<select :className="$style.select" :value="settings[item.key]" @change="({ target: t }) => updateItem(item.key, item.type(t.value))" v-else-if="'select' === item.inputType">
				<option v-for="option of item.options" :key="option" :value="option">
					{{ option }}
				</option>
			</select>
		</label>
	</ModalShell>
</template>

<script setup>
	import { ModalShell, ToggleSwitch } from "@/components/misc"
	import { useSettingsStore } from "@/stores/settings"

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
		{
			inputType: "select",
			key: "apiURI",
			label: "API",
			options: process.env.VUE_APP_API_ENDPOINT.split(","),
			type: String,
		},
	]

	function updateItem(key, value) {
		settings.$patch({ [key]: value })
	}
</script>

<style module>
	.label {
		align-items: center;
		display: flex;
		gap: 1em;
		justify-content: space-between;

		& > :not(span) {
			cursor: pointer;
			height: 2em;
		}
	}

	.select {
		background-color: var(--background-color);
		border: none;
		color: var(--text-color);
		margin: 0.3em 0;
		min-width: 5rem;
	}
</style>
