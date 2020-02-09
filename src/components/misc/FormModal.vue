<template>
	<form>
		<img class="icon" src="../../assets/icons/down.svg">
		<img class="icon" src="../../assets/icons/trip_origin.svg">
		<img class="icon" src="../../assets/icons/person_pin.svg">
		<input type="text">
		
		<textarea></textarea>
		
		<div></div>

		<img id="submit" class="icon" src="../../assets/icons/send.svg">
	</form>
</template>

<script>

</script>

<style scoped>
	form {
		display: grid;
		grid-template-rows: 1.75rem 1fr 3.5rem;
		grid-template-columns: 3rem 3rem 3rem 1fr 3rem;
		grid-gap: 0.5rem;
		height: calc(100% - 2rem);
		justify-items: center;
	}

	input {
		grid-column: 4/6;
		height: 100%;
		border: none;
		padding: 2%;
		box-sizing: border-box;
		background-color: #21252b;
		color: #a8afbc;
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
		background-color: #21252b;
		border: none;
		color: #a8afbc;
		font-size: 1rem;
		box-sizing: border-box;
	}

	div {
		grid-column: 1/5;
	}

	.icon {
		height: 100%;
	}

	#submit {
		padding: 25%;
		height: 50%;
	}
</style>