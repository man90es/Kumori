<template>
	<div class="modal" :class="{ transparent }" ref="dragElement">
		<div :class="{ draggable }" ref="dragHandle">
			{{ header }}
			<button @click="closeHandler" v-if="closeable">
				<img class="icon" src="@/assets/icons/close.svg" />
			</button>
		</div>
		<slot />
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue"
	import { useDraggability } from "vue-draggability"
	import { useStore } from "vuex"

	const store = useStore()

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
		closeHandler: {
			type: Function,
			required: true,
		},
	})

	const dragElement = ref(null)
	const dragHandle = ref(null)
	const transparent = ref(store.state.settings.animations)

	onMounted(() => {
		props.draggable && useDraggability(dragElement, dragHandle)
		setTimeout(() => (transparent.value = false), 1)
	})
</script>

<script>
	export default {
		inheritAttrs: false,
	}
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
		transition: opacity 0.3s;

		&.transparent {
			opacity: 0;
		}

		& > div:first-child {
			height: 2rem;
			text-align: center;
			user-select: none;
		}

		button {
			position: absolute;
			right: 0;
		}
	}

	.draggable {
		cursor: move;
	}
</style>
