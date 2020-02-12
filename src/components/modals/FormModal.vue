<template>
	<form>
		<img class="icon" :class="{active: sage}" src="../../assets/icons/down.svg" @click="sage = !sage">
		<img class="icon" :class="{active: op}" src="../../assets/icons/trip_origin.svg" @click="op = !op">
		<img class="icon" :class="{active: user}" src="../../assets/icons/person_pin.svg" @click="user = !user">
		<input type="text">
		
		<textarea></textarea>
		
		<div></div>

		<img id="submit" class="icon" src="../../assets/icons/send.svg">
	</form>
</template>

<script>
	export default {
		name: 'FormModal',
		data() {
			return {
				sage: false,
				op: false,
				user: false
			}
		}
	}
</script>

<style scoped>
	form {
		display: grid;
		grid-template-rows: 1.75rem 1fr 3.5rem;
		grid-template-columns: 3rem 3rem 3rem 1fr 3rem;
		grid-gap: calc(var(--gap-size) / 2);
		height: calc(100% - 2rem);
		justify-items: center;
	}

	input {
		grid-column: 4/6;
		height: 100%;
		border: none;
		padding: 2%;
		box-sizing: border-box;
		background-color: var(--background-color);
		color: var(--text-color);
		text-align: center;
		font-size: 1rem;
		width: 100%;
	}

	textarea {
		padding: 2%;
		grid-column: 1/6;
		width: 100%;
		height: 100%;
		resize: none;
		background-color: var(--background-color);
		border: none;
		color: var(--text-color);
		font-size: 1rem;
		box-sizing: border-box;
	}

	div {
		grid-column: 1/5;
	}

	.icon {
		height: 100%;
		cursor: pointer;
	}

	.icon:not(.active) {
		opacity: 0.5;
	}

	#submit {
		padding: 25%;
		height: 50%;
		opacity: 1;
	}
</style>