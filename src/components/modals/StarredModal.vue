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
			this.parent.setParams({
				header: 'Starred'
			})
		}
	}
</script>