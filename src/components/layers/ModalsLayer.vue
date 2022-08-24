<template>
	<div :class="{ backdrop }" id="ModalsLayer" v-if="modalsMeta.length > 0 && $route.name !== 'home'">
		<component
			:closeHandler="() => close(meta.modal)"
			:is="meta.modal"
			:key="meta.key"
			:setBackdrop="setBackdrop"
			v-bind="meta.data"
			v-for="meta in modalsMeta"
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
	import UserModal from "@/components/modals/UserModal"

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
		if (!isOpen(modal)) {
			return open(modal, data)
		}

		const i = modalsMeta.value.findIndex((meta) => meta.modal === modal)
		modalsMeta.value[i].data = data
	}

	function openOrClose(modal, data = {}) {
		return isOpen(modal) ? close(modal) : open(modal, data)
	}

	function setBackdrop(state) {
		backdrop.value = state
	}

	window.emitter.on("log-off", () => close(UserModal))
	window.emitter.on("menu-chat-button-click", (data) => openOrClose(FormModal, data))
	window.emitter.on("menu-person-button-click", (data) => openOrClose(UserModal, data))
	window.emitter.on("menu-search-button-click", (data) => openOrClose(SearchModal, data))
	window.emitter.on("menu-settings-button-click", (data) => openOrClose(SettingsModal, data))
	window.emitter.on("need-captcha", (data) => open(CaptchaModal, data))
	window.emitter.on("post-attachment-preview-click", (data) => openOrPassData(MediaModal, data))
	window.emitter.on("post-delete-button-click", (data) => openOrPassData(DeletePostModal, data))
	window.emitter.on("post-reply-button-click", (data) => openOrPassData(FormModal, data))
	window.emitter.on("unsafe-link-click", (data) => openOrPassData(UnsafeLinkModal, data))
</script>

<style scoped lang="scss">
	#ModalsLayer {
		align-items: center;
		display: flex;
		height: 100vh;
		justify-content: center;
		left: 0;
		pointer-events: none;
		position: fixed;
		top: 0;
		width: 100vw;

		&.backdrop {
			background-color: #0005;
			pointer-events: auto;
		}
	}
</style>
