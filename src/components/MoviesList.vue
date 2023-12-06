<script setup>
import { computed, ref, watch } from 'vue';
import MovieItem from './MovieItem.vue';

const props = defineProps({
	list: {
		type: Object,
		default: () => ({}),
	},
});

const emit = defineEmits(['changePoster']);

const isMoviesListExist = ref(false);

const onMouseOver = (poster) => {
	emit('changePoster', poster);
};
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
	<BContainer class="movie-list-container">
		<h3 class="list-title">IMDb Top 250</h3>
		<BRow>
			<template v-if="isMoviesListExist">
				<BCol
					cols="3"
					v-for="(movie, key) in list"
					:key="key"
				>
					<MovieItem
						:movie="movie"
						@mouseover="onMouseOver(movie.Poster)"
					/>
				</BCol>
			</template>
			<template v-else> Empty list </template>
		</BRow>
	</BContainer>
</template>
<style lang="scss" scoped>
.movie-list-container {
	padding-top: 50px;
}
.list-title {
	font-size: 50px;
	margin-bottom: 50px;
	color: #fff;
	// text-align: center;
}
</style>
