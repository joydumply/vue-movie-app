import IDs from '@/stores/mock/omdb_top250';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

function serializeMoviesResponse(movies) {
	return movies.reduce((acc, movie) => {
		acc[movie.imdbID] = movie;
		return acc;
	}, {});
}

export const useMoviesStore = defineStore('movies', () => {
	// state
	const top250IDs = ref(IDs);
	const moviesPerPage = ref(12);
	const currentPage = ref(1);
	const movies = ref({});

	// getter
	const getMovies = computed(() => movies);

	const slicedIDs = (from, to) => top250IDs.value.slice(from, to);

	// method to fetch

	const fetchMovies = async () => {
		try {
			const from = currentPage.value * moviesPerPage.value - moviesPerPage.value;
			const to = currentPage.value * moviesPerPage.value;
			const moviesToFetch = slicedIDs(from, to);
			const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
			const response = await Promise.all(requests);
			const response_movies = serializeMoviesResponse(response);
			movies.value = response_movies;
		} catch (err) {
			console.error(err);
		}
	};

	return { top250IDs, moviesPerPage, currentPage, movies, getMovies, fetchMovies };
});
