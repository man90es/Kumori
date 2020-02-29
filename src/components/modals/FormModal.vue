<template>
	<form>
		<img class="icon" :class="{active: sage}" src="../../assets/icons/down.svg" @click="sage = !sage">
		<img class="icon" :class="{active: op}" src="../../assets/icons/trip_origin.svg" @click="op = !op">
		<img class="icon" :class="{active: user}" src="../../assets/icons/person_pin.svg" @click="user = !user">
		<input type="text">
		
		<textarea></textarea>
		
		<button type="button" id="attachFile">
			<img class="icon" src="../../assets/icons/attach_file.svg">
		</button>

		<div>
			<!--Attached file thumbnails go here-->	
		</div>

		<button type="button" id="submit">
			<img class="icon" src="../../assets/icons/send.svg">
		</button>
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
		min-height: 7em;
		min-width: 30em;
		width: 100%;
		resize: none;
		background-color: var(--background-color);
		border: none;
		color: var(--text-color);
		font-size: 1rem;
		box-sizing: border-box;
		margin-top: calc(var(--gap-size) / 2);
		margin-bottom: 0;
	}

	div {
		grid-column: 2/5;
		width: 100%;
		height: 100%;
		background-color: var(--background-color);
	}

	.icon {
		height: 100%;
		cursor: pointer;
	}

	.icon:not(.active) {
		opacity: 0.5;
	}

	#submit, #attachFile {
		background-color: var(--background-color);
		width: 100%;
	}

	#submit .icon, #attachFile .icon {
		opacity: 1;
		height: 50%;
	}
</style>