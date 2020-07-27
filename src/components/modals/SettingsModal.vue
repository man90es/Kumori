<template>
	<div>

	</div>
</template>

<script>
	export default {
		name: 'SettingsModal',
		props: [
			'parent'
		],
		created() {
			this.parent.setParams({
				header: 'Settings'
			})
		}
	}
</script>