<template>
	<div class="postMenu" @click="parent.hideMenu">
		<div>Hide</div>
		<div>Add to Starred</div>
		<div>Delete</div>
		<div>Edit</div>
	</div>
</template>

<script>
	export default {
		name: 'PostMenu',
		props: [
			'parent'
		]
	}
</script>

<style scoped>
	.postMenu {
		position: absolute;
		background-color: var(--card-color);
		z-index: 99;
	}

	.postMenu div {
		cursor: pointer;
		padding: calc(var(--gap-size) / 2);
	}

	.postMenu div:hover {
		background-color: var(--card-secondary-color);
	}
</style>
