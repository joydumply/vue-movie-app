<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useMoviesStore } from './stores/movies';
import Loader from './components/Loader.vue';
import Header from '@/components/Header.vue';
import MoviesList from './components/MoviesList.vue';
import PosterBg from './components/PosterBg.vue';
import MoviesPagintion from './components/MoviesPagintion.vue';
import Notification from './components/Notification.vue';
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
const moviesList = ref(moviesData.movies);

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

const onRemoveMovie = (id) => {
	moviesStore.removeMovie(id);
};

const onSearchChanged = (query) => {
	const query_value = query;
	// const query_value = query.value;
	if (query_value.length > 2) {
		moviesStore.isSearchActive = true;
		moviesStore.searchMovie(query_value);
	}
	if (query_value.length == 0) {
		moviesStore.fetchMovies();
		moviesStore.isSearchActive = false;
	}
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
	<Header @searchChanged="onSearchChanged" />
	<BToaster />
	<Loader />
	<PosterBg :poster="posterBg" />
	<MoviesList
		:list="moviesList"
		@changePoster="onChangePoster"
		@removeMovie="onRemoveMovie"
	/>
	{{ moviesTotal.value }}
	<MoviesPagintion
		:current-page="currentPage"
		:total="moviesTotal"
		:perPage="moviesPerPage"
		@pageChanged="onPageChanged"
	/>
	<Notification />
</template>

<style>
body {
	font-family: Arial, Helvetica, sans-serif;
}
#app {
	position: relative;
	min-height: 100vh;
}
</style>
