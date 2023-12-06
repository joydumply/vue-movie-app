<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
	poster: {
		type: String,
		default: '',
	},
});

const defaultPosterBgUrl = ref('linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)');

const posterBg = computed(() => (props.poster ? `url(${props.poster})` : defaultPosterBgUrl.value));

const posterStyle = computed(() => {
	return {
		'background-image': posterBg.value,
	};
});
</script>

<template>
	<div
		class="poster-page-bg"
		:style="posterStyle"
	></div>
</template>

<style lang="scss" scoped>
.poster-page-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	// background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
	background-size: cover;
	background-position: center;
	transition: all ease 0.2s;
	&::before {
		content: '';
		opacity: 0.7;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
	}
}
</style>
