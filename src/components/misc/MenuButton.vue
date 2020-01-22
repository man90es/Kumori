<template>
	<button>
		<img class='icon' :src='getIconSrc()'>
	</button>
</template>

<script>

	export default {
		name: 'MenuButton',
		props: ['icon'],
		methods: {
			getIconSrc() {
				let images = require.context('../../assets/icons', false, /\.svg$/)
				return images(`./${this.icon}.svg`)
			}
		},
	}
</script>

<style scoped>
	button{
		height: 3.5rem;
		width: 3.5rem;
		justify-content: center;
		align-items: center;
		display: flex;
		color: #a8afbc;
		background-color: #282c34;
		border-radius: .3rem;
		border: none;
	}

	img{

	}
</style>
