<script setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import MovieItem from './MovieItem.vue';
import { useMoviesStore } from '../stores/movies';

const props = defineProps({
	list: {
		type: Object,
		default: () => ({}),
	},
	moviesListTitle: {
		type: String,
		default: '',
	},
});
const modal = ref(false);
const modalMovieName = ref('');
const modalMovidId = ref(null);
const moviesStore = useMoviesStore();
const emit = defineEmits(['changePoster', 'removeMovie']);

const listTitle = computed(() => {
	return moviesStore.isSearchActive ? 'Search Result' : 'IMDb Top 250';
});

const isMoviesListExist = ref(false);

const onMouseOver = (poster) => {
	emit('changePoster', poster);
};

const onRemoveMovie = (id, title) => {
	modalMovieName.value = title;
	modalMovidId.value = id;
	modal.value = true;
};
const confirmRemoveMovie = () => {
	emit('removeMovie', modalMovidId.value);
};
watch(
	() => props.list,
	(newValue, oldValue) => {
		if (newValue && Object.keys(newValue).length > 0) {
			isMoviesListExist.value = true;
		} else {
			isMoviesListExist.value = false;
		}
	}
);
</script>

<template>
	<BModal
		v-model="modal"
		title="Remove Confirmation"
		@ok="confirmRemoveMovie"
	>
		Do you want to remove <strong>{{ modalMovieName }}</strong> from the list?
	</BModal>
	<BContainer class="movie-list-container">
		<h3 class="list-title">{{ listTitle }}</h3>
		<BRow>
			<template v-if="isMoviesListExist">
				<BCol
					cols="3"
					v-for="(movie, key) in list"
					:key="key"
				>
					<MovieItem
						:movie="movie"
						@mouseover="onMouseOver(movie.Poster)"
						@emitRemoveMovie="onRemoveMovie"
					/>
				</BCol>
			</template>
			<template v-else> Empty list </template>
		</BRow>
	</BContainer>
</template>
<style lang="scss" scoped>
.movie-list-container {
	padding-top: 50px;
}
.list-title {
	font-size: 50px;
	margin-bottom: 50px;
	color: #fff;
	// text-align: center;
}
</style>
