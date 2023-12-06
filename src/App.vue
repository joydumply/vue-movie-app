<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMoviesStore } from './stores/movies';
const store = useMoviesStore();

onMounted(() => {
	store.fetchMovies();
});

const { test } = storeToRefs(store); // destructurisation with saving reactivity
</script>

<template>
	<h1>These are equal</h1>
	{{ store.test }}
	<hr />
	{{ test }}
	<hr />
	<button @click="store.plusTest">Click for more</button>
	<hr />
	<button @click="store.getMovies">Click to console.log Movies</button>
</template>

<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
