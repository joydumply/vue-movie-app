<template>
	<div
		class="loader-wrap"
		v-if="loaderStore.isShowLoader"
	>
		<BSpinner
			type="grow"
			variant="light"
		/>
	</div>
</template>

<script>
import { useLoaderStore } from '@/stores/loader';
export default {
	props: {},
	setup() {
		const loaderStore = useLoaderStore();

		return { loaderStore };
	},
};
</script>

<style lang="scss" scoped>
.loader-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3;
}
</style>
