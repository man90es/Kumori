<template>
	<div :class="{ backdrop }" id="ModalsLayer" v-if="modalsMeta.length > 0 && $route.name !== 'home'">
		<component
			v-for="meta in modalsMeta"
			:is="meta.modal"
			v-bind="meta.data"
			:key="meta.key"
			:closeHandler="() => close(meta.modal)"
			:setBackdrop="setBackdrop"
		/>
	</div>
</template>

<script setup>
	import { ref, markRaw } from "vue"
	import CaptchaModal from "@/components/modals/CaptchaModal"
	import DeletePostModal from "@/components/modals/DeletePostModal"
	import FormModal from "@/components/modals/FormModal"
	import MediaModal from "@/components/modals/MediaModal"
	import SearchModal from "@/components/modals/SearchModal"
	import SettingsModal from "@/components/modals/SettingsModal"
	import UnsafeLinkModal from "@/components/modals/UnsafeLinkModal"

	const modalsMeta = ref([])
	const backdrop = ref(false)

	function isOpen(modal) {
		return !!modalsMeta.value.find((meta) => meta.modal === modal)
	}

	function open(modal, data = {}) {
		markRaw(modal)
		modalsMeta.value.push({ modal, data, key: +new Date() })
	}

	function close(modal) {
		const i = modalsMeta.value.findIndex((meta) => meta.modal === modal)
		modalsMeta.value.splice(i, 1)
	}

	function openOrPassData(modal, data) {
		if (!isOpen(modal)) return open(modal, data)

		const i = modalsMeta.value.findIndex((meta) => meta.modal === modal)
		modalsMeta.value[i].data = data
	}

	function openOrClose(modal, data = {}) {
		if (!isOpen(modal)) return open(modal, data)

		close(modal)
	}

	function setBackdrop(state) {
		backdrop.value = state
	}

	window.emitter.on("menu-chat-button-click", (data) => openOrClose(FormModal, data))
	window.emitter.on("post-reply-button-click", (data) => openOrPassData(FormModal, data))
	window.emitter.on("menu-search-button-click", (data) => openOrClose(SearchModal, data))
	window.emitter.on("menu-settings-button-click", (data) => openOrClose(SettingsModal, data))
	window.emitter.on("post-attachment-preview-click", (data) => openOrPassData(MediaModal, data))
	window.emitter.on("unsafe-link-click", (data) => openOrPassData(UnsafeLinkModal, data))
	window.emitter.on("post-delete-button-click", (data) => openOrPassData(DeletePostModal, data))
	window.emitter.on("need-captcha", (data) => open(CaptchaModal, data))
</script>

<style scoped lang="scss">
	#ModalsLayer {
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		position: fixed;
		justify-content: center;
		align-items: center;
		display: flex;
		pointer-events: none;

		&.backdrop {
			background-color: #0005;
			pointer-events: auto;
		}
	}
</style>
