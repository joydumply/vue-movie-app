import IDs from '@/stores/mock/omdb_top250';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLoaderStore } from '@/stores/loader';

import axios from '@/plugins/axios';

function serializeMoviesResponse(movies) {
	return movies.reduce((acc, movie) => {
		acc[movie.imdbID] = movie;
		return acc;
	}, {});
}

export const useMoviesStore = defineStore('movies', () => {
	// using Loader store inside Movies Store (nested store)
	const loaderStore = useLoaderStore();

	// state
	const top250IDs = ref(IDs);
	const moviesPerPage = ref(12);
	const currentPage = ref(1);
	const movies = ref({});

	// getter
	const getMoviesListLength = computed(() => Object.keys(top250IDs.value).length);

	const slicedIDs = (from, to) => top250IDs.value.slice(from, to);

	// method to fetch

	const fetchMovies = async () => {
		try {
			loaderStore.toggleLoader(true);
			const from = currentPage.value * moviesPerPage.value - moviesPerPage.value;
			const to = currentPage.value * moviesPerPage.value;
			const moviesToFetch = slicedIDs(from, to);
			const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
			const response = await Promise.all(requests);
			const response_movies = serializeMoviesResponse(response);
			movies.value = response_movies;
		} catch (err) {
			console.error(err);
		} finally {
			// used timeout to see Loader :)
			setTimeout(() => {
				loaderStore.toggleLoader(false);
			}, 500);
		}
	};

	return { top250IDs, moviesPerPage, currentPage, movies, getMoviesListLength, fetchMovies };
});
