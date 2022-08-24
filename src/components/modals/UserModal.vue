<template>
	<ModalShell header="My info">
		<div class="my-info-grid">
			<div>Name</div>
			<div>{{ user.name }}</div>
			<div>Email</div>
			<div>{{ user.email }}</div>
			<button type="button" @click="logOff">Log off</button>
		</div>
	</ModalShell>
</template>

<script setup>
	import { useUserStore } from "@/stores/user"
	import API from "@/api"
	import ModalShell from "@/components/misc/ModalShell"

	const user = useUserStore()

	function logOff() {
		API.auth.logOff()
	}
</script>

<style lang="scss" scoped>
	.my-info-grid {
		display: grid;
		grid-gap: 0.5em 1em;
		grid-template-columns: 1fr 1fr;
	}

	button {
		background-color: var(--card-secondary-color);
		color: var(--text-color);
		grid-column: 2;
		padding: 0.5em;
	}
</style>
