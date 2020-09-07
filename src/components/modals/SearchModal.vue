<template>
	<form @submit.prevent="submit()">
		<div class="row">
			<input type="text" id="searchQuery" v-model="query" placeholder="Query" title="Query">
			<button><img class="icon" src="../../assets/icons/search.svg" title="Search"></button>
		</div>
		<div class="row">
			<input type="text" v-model="boardName" placeholder="Board name" title="Board name">
			<input type="number" min="1" v-model="threadNumber" placeholder="Thread number" title="Thread number">
		</div>
		<div class="row">
			<input type="date" v-model="dateFrom" title="After">
			<input type="date" v-model="dateTo" title="Before">
		</div>
	</form>
</template>

<script>
	import { submitSearchQuery } from '../../api'

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
		methods: {
			submit() {
				submitSearchQuery({
					query: this.query, 
					parameters: {
						after: this.dateFrom,
						before: this.dateTo,
						boardName: this.boardName,
						threadNumber: this.threadNumber,
						searchOnlyInSubjects: false 
					}
				})
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
	}

	#searchQuery {
		width: 100%;
	}

	input:not(#searchQuery) {
		width: calc(50% - var(--gap-size) / 2);
	}

	.row {
		display: flex;
		width: 100%;
	}

	.row *:not(:last-child) {
		margin-right: var(--gap-size);
	}

	.row:not(:last-child) {
		margin-bottom: var(--gap-size);
	}
</style>