<template>
	<div id="searchWidget">
		<input type="text" id="searchQuery" v-model="query" placeholder="Query">
		<img class="icon" src="../../assets/icons/search.svg">
		<input type="text" id="boardName" v-model="boardName" placeholder="Board name">
		<input type="text" id="threadNumber" v-model="threadNumber" placeholder="Thread number">
		<input type="date" v-model="dateFrom">
		<input type="date" v-model="dateTo">
	</div>
</template>

<script>
	export default {
		name: 'SearchModal',
		props: [
			'parent'
		],
		data() {
			return {
				query: '',
				boardName: '',
				threadNumber: '',
				dateFrom: null,
				dateTo: null
			}
		},
		created() {
			this.parent.setParams({
				header: 'Search'
			})
		}
	}
</script>

<style scoped>
	#searchWidget {
		display: grid;
		grid-template-rows: 1.75rem 1.75rem 1.75rem;
		grid-template-columns: 1fr 1.75rem 1fr 1.75rem;
		grid-gap: calc(var(--gap-size) / 2);
	}

	.icon {
		cursor: pointer;
	}

	input {
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

	#searchQuery {
		grid-column: 1/4;
	}

	#boardName, [type="date"]:nth-last-of-type(2) {
		grid-column: 1/3;
	}

	#threadNumber, [type="date"]:last-of-type {
		grid-column: 3/5;
	}


</style>