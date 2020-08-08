<template>
	<div id="home">
		<div :style="backgroundStyle"></div>
		<img src="logo.svg">
		<ul>
			<li v-for="(board, boardName) in $store.state.boards" :key="boardName">
				<router-link :to="{name: 'board', params: {boardName}}">/{{boardName}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'home',

		computed: {
			backgroundStyle() {
				return `background-image:url(https://picsum.photos/${Math.round(window.screen.width / 2)}/${Math.round(window.screen.height / 2)})`
			}
		}
	}
</script>

<style scoped>
	#home {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
	}

	#home > :first-child {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-position: center;
		background-size: cover;
		filter: url("#sharpBlur");
		opacity: .4;
	}

	img {
		z-index: 1;
		height: 15rem;
		border-radius: 50%;
		padding: 1.5rem 1rem;
		background-color: #fff1;
		transition: padding .2s, background-color .2s;
	}

	img:hover {
		padding: 2.5rem 2rem;
		background-color: #fff2;
	}

	ul {
		padding: 0;
		width: 90%;
		display: flex;
		justify-content: space-around;
		font-size: 2rem;
		position: fixed;
		bottom: 1rem;
		font-weight: bold;
		list-style: none;
	}

	li {
		width: 100%;
		text-align: center;
	}

	a {
		padding: .25em 0;
		color: #a8afbc;
		display: block;
		transition: background-color .2s;
	}

	a:hover {
		background-color: #fff1;
	}
</style>