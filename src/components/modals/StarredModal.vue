<template>
	<div>
		
	</div>
</template>

<script>
	export default {
		name: 'StarredModal',
		props: [
			'parent'
		],
		created() {
			this.parent.setHeader('Starred')
		}
	}
</script>