<script setup>
import { onMounted, ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useMoviesStore } from './stores/movies';
import MoviesList from './components/MoviesList.vue';
const moviesStore = useMoviesStore();

const moviesData = toRefs(moviesStore);
const moviesList = moviesData.movies;

onMounted(() => {
	moviesStore.fetchMovies();
});
</script>

<template>
	<MoviesList :list="moviesList" />
</template>

<style scoped>
body {
	font-family: Arial, Helvetica, sans-serif;
}
</style>
