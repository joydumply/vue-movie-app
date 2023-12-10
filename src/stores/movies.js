import IDs from '@/stores/mock/omdb_top250';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLoaderStore } from '@/stores/loader';
import { useNotificationStore } from '@/stores/notification';

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
	const notificationStore = useNotificationStore();

	// state
	const top250IDs = ref(IDs);
	const moviesPerPage = ref(12);
	const currentPage = ref(1);
	const movies = ref({});
	const isSearchActive = ref(false);

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

	const removeMovie = (id) => {
		const index = top250IDs.value.findIndex((item) => item === id);
		if (index !== -1) {
			top250IDs.value.splice(index, 1);
			const moviesCopy = { ...movies.value };
			delete moviesCopy[id];
			movies.value = moviesCopy;
		}
	};

	const searchMovie = async (query) => {
		try {
			loaderStore.toggleLoader(true);
			const response = await axios.get(`/?s=${query}`);

			if (response.Error) {
				throw Error(response.Error);
			}

			const response_movies = serializeMoviesResponse(response.Search);
			movies.value = response_movies;
		} catch (err) {
			console.error(err);
			notificationStore.show_toast_message({
				msg: 'Movie is not found',
				title: 'Message',
				variant: 'danger',
			});
		} finally {
			loaderStore.toggleLoader(false);
		}
	};

	return {
		top250IDs,
		moviesPerPage,
		currentPage,
		movies,
		isSearchActive,
		getMoviesListLength,
		fetchMovies,
		removeMovie,
		searchMovie,
	};
});
