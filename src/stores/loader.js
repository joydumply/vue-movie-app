import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', () => {
	const isShowLoader = ref(false);

	const toggleLoader = (bool = !isShowLoader.value) => {
		isShowLoader.value = bool;
	};

	return { isShowLoader, toggleLoader };
});
