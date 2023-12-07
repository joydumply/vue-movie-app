<script setup>
import { computed, onMounted, onUpdated, ref, toRefs, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMoviesStore } from './stores/movies';
import MoviesList from './components/MoviesList.vue';
import PosterBg from './components/PosterBg.vue';
import MoviesPagintion from './components/MoviesPagintion.vue';
const moviesStore = useMoviesStore();

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const getUrlQueryParams = async () => {
	await router.isReady();
	console.log(route.query);
	return route.query
};

const moviesData = toRefs(moviesStore);
const moviesList = moviesData.movies;

const posterBg = ref('');

const onChangePoster = (poster) => {
	posterBg.value = poster;
};

const currentPage = computed({
	get() {
		return moviesData.currentPage.value;
	},
	set(value) {
		moviesData.currentPage.value = value;
	},
});
const moviesPerPage = computed({
	get() {
		return moviesData.moviesPerPage.value;
	},
	set(value) {
		moviesData.moviesPerPage.value = value;
	},
});

const moviesTotal = computed(() => moviesData.getMoviesListLength.value);

const onPageChanged = (page) => {
	currentPage.value = page;
	router.push({ query: { page } });
	moviesStore.fetchMovies();
};

onMounted(() => {
	moviesStore.fetchMovies();

	// const pageQuery = getUrlQueryParams();

	getUrlQueryParams().then((v) => {
		console.log(v);
	});

	// if (route.query.page) {
	// 	console.log('I am here');
	// 	currentPage.value = route.query.page;
	// 	moviesStore.fetchMovies();
	// }
	// console.log(router.currentRoute.query);
	// if (router.currentRoute.query) {
	// 	console.log('I am here router');

	// 	currentPage.value = route.query.page;
	// 	moviesStore.fetchMovies();
	// }
});

watch(
	() => route.query,
	(newQuery, oldQuery) => {
		console.log('New query parameters:', newQuery);
	}
);
</script>

<template>
	<PosterBg :poster="posterBg" />
	<MoviesList
		:list="moviesList"
		@changePoster="onChangePoster"
	/>
	{{ moviesTotal.value }}
	<MoviesPagintion
		:current-page="currentPage"
		:total="moviesTotal"
		:perPage="moviesPerPage"
		@pageChanged="onPageChanged"
	/>
</template>

<style>
body {
	font-family: Arial, Helvetica, sans-serif;
}
#app {
	position: relative;
}
</style>
