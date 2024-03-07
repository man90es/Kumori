<template>
	<img class="icon" :src="require(`@/assets/icons/toggle_${on ? 'on' : 'off'}.svg`)" @click="toggle" />
</template>

<script setup lang="ts">
	import { ref } from "vue"

	const props = defineProps<{ modelValue: boolean }>()
	const emit = defineEmits(["update:modelValue"])

	const on = ref(props.modelValue)

	function toggle() {
		on.value = !on.value
		emit("update:modelValue", on.value)
	}
</script>
