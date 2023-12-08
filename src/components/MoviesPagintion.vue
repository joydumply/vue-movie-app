<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
	currentPage: {
		type: Number,
		default: 1,
	},
	total: {
		type: Number,
		default: 1,
	},
	perPage: {
		type: Number,
		default: 1,
	},
});

const emit = defineEmits(['pageChanged']);

const currentPageModel = computed({
	get() {
		return props.currentPage;
	},
	set(value) {
		emit('pageChanged', value);
	},
});

// onMounted(() => {
// 	console.log(props.total);
// 	console.log(props.perPage);
// });
</script>
<template>
	<div class="movies-pagination d-flex justify-content-center">
		<BPagination
			v-model="currentPageModel"
			:total-rows="total"
			:per-page="perPage"
			prev-text="Prev"
			next-text="Next"
		/>
	</div>
</template>

<style lang="scss" scoped>
.movies-pagination {
	margin-top: 30px;
}
.movies-pagination :deep(.pagination .page-item .page-link) {
	background-color: transparent;
	font-size: 12px;
	color: #fff;
	box-shadow: none;
}

.movies-pagination :deep(.pagination .page-item.active .page-link) {
	border-color: #fff;
	background-color: #fff;
	color: #000;
}

.movies-pagination :deep(.pagination .page-item.disabled .page-link) {
	color: lightgrey;
}
</style>
