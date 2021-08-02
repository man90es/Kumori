<template>
	<Shell :header="$t('searchModal.header')">
		<form @submit.prevent="submit()">
			<div class="row">
				<input type="text" id="searchQuery" v-model="query" :placeholder="$t('searchModal.query')" :title="$t('searchModal.query')">
				<button><img class="icon" src="../../assets/icons/search.svg" :title="$t('searchModal.header')"></button>
			</div>
			<div class="row">
				<input type="text" v-model="boardName" :placeholder="$t('searchModal.boardName')" :title="$t('searchModal.boardName')">
				<input type="number" min="1" v-model="threadNumber" :placeholder="$t('searchModal.threadNumber')" :title="$t('searchModal.threadNumber')">
			</div>
			<div class="row">
				<input type="date" v-model="dateFrom" :title="$t('searchModal.after')">
				<input type="date" v-model="dateTo" :title="$t('searchModal.before')">
			</div>
		</form>
	</Shell>
</template>

<script>
	import API from '../../api'
	import Shell from './Shell.vue'

	export default {
		name: 'SearchModal',
		components: {
			Shell
		},
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
				API.post.findMany({
					query: this.query,
					parameters: {
						after: this.dateFrom,
						before: this.dateTo,
						boardName: this.boardName,
						threadNumber: this.threadNumber,
					},
				})
			},
			close() {
				this.$parent.closeByKey(this._.vnode.key)
			},
		},
	}
</script>

<style scoped lang="scss">
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

		&:not(:last-child) {
			margin-bottom: var(--gap-size);
		}

		*:not(:last-child) {
			margin-right: var(--gap-size);
		}
	}
</style>
