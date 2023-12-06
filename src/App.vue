<script setup>
import { onMounted, ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useMoviesStore } from './stores/movies';
import MoviesList from './components/MoviesList.vue';
import PosterBg from './components/PosterBg.vue';
const moviesStore = useMoviesStore();

const moviesData = toRefs(moviesStore);
const moviesList = moviesData.movies;

const posterBg = ref('');

const onChangePoster = (poster) => {
	posterBg.value = poster;
};

onMounted(() => {
	moviesStore.fetchMovies();
});
</script>

<template>
	<PosterBg :poster="posterBg" />
	<MoviesList
		:list="moviesList"
		@changePoster="onChangePoster"
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
