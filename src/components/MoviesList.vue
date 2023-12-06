<script setup>
import { computed, ref, watch } from 'vue';
import MovieItem from './MovieItem.vue';

const props = defineProps({
	list: {
		type: Object,
		default: () => ({}),
	},
});

const isMoviesListExist = ref(false);
watch(
	() => props.list,
	(newValue, oldValue) => {
		if (newValue && Object.keys(newValue).length > 0) {
			isMoviesListExist.value = true;
		} else {
			isMoviesListExist.value = false;
		}
	}
);
</script>

<template>
	<BContainer>
		<h3 class="list-title">IMDb Top 250</h3>
		<BRow>
			<template v-if="isMoviesListExist">
				<BCol
					cols="3"
					v-for="(movie, key) in list"
					:key="key"
				>
					<MovieItem :movie="movie" />
				</BCol>
			</template>
			<template v-else> Empty list </template>
		</BRow>
	</BContainer>
</template>
<style lang="scss" scoped>
.list-title {
	font-size: 50px;
	margin-bottom: 50px;
	text-align: center;
}
</style>
