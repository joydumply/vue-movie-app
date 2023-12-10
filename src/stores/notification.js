import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
	const messagePool = ref([]);

	const getMessagePool = computed(() =>
		messagePool.value.length ? messagePool.value[messagePool.value.length - 1] : null
	);

	const show_toast_message = (msg) => {
		messagePool.value.push(msg);
	};

	return { messagePool, getMessagePool, show_toast_message };
});
