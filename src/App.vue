<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useMoviesStore } from './stores/movies';
import { useLoaderStore } from './stores/loader';
import Loader from './components/Loader.vue';
import MoviesList from './components/MoviesList.vue';
import PosterBg from './components/PosterBg.vue';
import MoviesPagintion from './components/MoviesPagintion.vue';
const moviesStore = useMoviesStore();

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

/**
 * * Needed async function to get Query Parameters for onMounted Lifecycle hook
 */
const getUrlQueryParams = async () => {
	await router.isReady();
	return route.query;
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
	getUrlQueryParams().then((query) => {
		if (query.page) {
			onPageChanged(Number(query.page));
		} else {
			moviesStore.fetchMovies();
		}
	});
});
</script>

<template>
	<Loader />
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
