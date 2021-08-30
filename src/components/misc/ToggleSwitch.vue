<template>
	<img class="icon" :src="require(`../../assets/icons/toggle_${state ? 'on' : 'off'}.svg`)">
</template>

<script setup>
	import { defineProps } from "vue"

	const props = defineProps({ state: String })
</script>

<style scoped>
	.icon {
		height: 100%;
	}
</style>
