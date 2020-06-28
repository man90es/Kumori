<template>
	<div>

	</div>
</template>

<script>
	export default {
		name: 'SearchModal',
		props: [
			'parent'
		],
		created() {
			this.parent.setHeader('Search')
		}
	}
</script>