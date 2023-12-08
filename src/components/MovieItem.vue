<script setup>
import { computed } from 'vue';

const props = defineProps({
	movie: {
		type: Object,
	},
});

const emit = defineEmits(['emitRemoveMovie']);

const posterBg = computed(() => {
	return {
		'background-image': `url(${props.movie.Poster})`,
	};
});

const removeMovie = () => {
	emit('emitRemoveMovie', props.movie.imdbID, props.movie.Title);
};
</script>

<template>
	<div class="movie-item mb-3">
		<div
			class="movie-item-poster"
			:style="posterBg"
		></div>
		<div class="movie-item-wrap d-flex flex-column justify-content-between">
			<div class="movie-item-info">
				<h3 class="movie-title">{{ movie.Title }}</h3>
				<span class="movie-year">{{ movie.Year }}</span>
			</div>
			<div class="movie-item-controls row no-gutters">
				<div class="col">
					<BButton
						block
						variant="outline-light"
						>Edit</BButton
					>
				</div>
				<div class="col">
					<BButton
						block="true"
						variant="outline-light"
						@click="removeMovie"
						>Remove</BButton
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.movie-item {
	position: relative;
	cursor: pointer;
	border-radius: 5px;
	overflow: hidden;
	transition: all 0.2s linear;
	height: 400px;
	&:hover {
		box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
		transform: scale(1.02);
		.movie-item-wrap {
			opacity: 1;
		}
	}
	.btn {
		width: 100%;
	}
	&-poster {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		z-index: -1;
	}
	&-wrap {
		padding: 20px 10px;
		height: 100%;
		opacity: 0;
		transition: all ease 0.2s;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.movie-title {
		font-size: 20px;
		color: #fff;
	}
	.movie-year {
		font-size: 14px;
		color: #fff;
	}
}
</style>
