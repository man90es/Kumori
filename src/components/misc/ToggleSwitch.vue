<template>
	<img class="icon" :src="require(`../../assets/icons/toggle_${state ? 'on' : 'off'}.svg`)">
</template>

<script>
	export default {
		name: 'ToggleSwitch',
		props: ['state']
	}
</script>

<style scoped>
	.icon {
		height: 100%;
	}
</style>
