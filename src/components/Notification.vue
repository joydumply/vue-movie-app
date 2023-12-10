<template>
	<div>
		<BButton @click="showNotification()"> Click </BButton>
	</div>
</template>
<script>
import { useToast } from 'bootstrap-vue-next';
import { computed, ref, watch } from 'vue';
import { useNotificationStore } from '@/stores/notification';

export default {
	setup() {
		const notificationStore = useNotificationStore();
		const messagePool = computed(() => notificationStore.getMessagePool);
		const { show } = useToast();
		const showNotification = ({ variant = 'dark', message = null, title = null }) => {
			show(message, {
				variant: variant,
				title: title,
			});
		};
		watch(messagePool, (newValue, oldValue) => {
			const { msg, title, variant } = newValue;
			showNotification({
				message: msg,
				title,
				variant,
			});
		});
		return { messagePool, showNotification };
	},
};
</script>
<style lang="scss"></style>
