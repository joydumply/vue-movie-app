import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useMoviesStore = defineStore('movies', () => {
	const test = ref(0);

	const getTest = computed(() => test.value);

	const plusTest = () => {
		test.value++;
	};

	const getMovies = async () => {
		const id = 'tt0111161';
		// tt0111161
		const res = await axios.get('/?i=tt0111161');
		console.log(res);
	};

	return { test, getTest, plusTest, getMovies };
});
