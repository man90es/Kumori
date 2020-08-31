<template>
	<div>
		<span @click="() => $store.commit('toggleTheme')">
			Toggle theme <div id="themeCheckbox"></div>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'SettingsModal',
		props: [
			'parent'
		],
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
		width: 20rem;
		justify-content: space-between;
		cursor: pointer;
	}

	#themeCheckbox {
		background-color: var(--alternative-theme-representative-color);
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
	}
</style>