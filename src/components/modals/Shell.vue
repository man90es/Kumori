<template>
	<div class="modal" ref="dragElement">
		<div :class="{ draggable }" ref="dragHandle">
			{{ header }}
			<button @click="$parent.close" v-if="closeable"><img class="icon" src="../../assets/icons/close.svg"></button>
		</div>
		<slot />
	</div>
</template>

<script setup>
	import { ref, defineProps, onMounted } from "vue"
	import { useDraggability } from "vue-draggability"

	const props = defineProps({
		header: {
			type: String,
			required: true,
		},
		closeable: {
			type: Boolean,
			default: true,
		},
		draggable: {
			type: Boolean,
			default: true,
		},
	})
	const dragElement = ref(null)
	const dragHandle = ref(null)

	onMounted(() => {
		props.draggable && useDraggability(dragElement, dragHandle)
	})
</script>

<style scoped lang="scss">
	.modal {
		pointer-events: auto;
		min-height: 5em;
		min-width: 5em;
		background-color: var(--card-color);
		box-shadow: 0 0 var(--gap-size) #0005;
		padding: var(--gap-size);
		position: fixed;

		& > div:first-child {
			height: 2rem;
			text-align: center;
			user-select: none;
		}

		button{
			position: absolute;
			right: 0;
		}
	}

	.draggable {
		cursor: move;
	}
</style>
