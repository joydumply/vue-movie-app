<template>
	<div class="movie-info-wrap">
		<header class="movie-info-header">
			<h6 class="movie-header-title">Movie view</h6>
			<IBiX
				class="close-icon"
				@click="closeModal"
			/>
		</header>

		<div class="movie-info-content">
			<BRow>
				<BCol sm="4">
					<div class="movie-poster-wrap mb-3">
						<div
							class="movie-poster"
							:style="posterStyle"
						></div>
					</div>
				</BCol>
				<BCol sm="8">
					<div class="movie-title">
						{{ movie.Title }}
					</div>

					<div class="movie-rating">Rating: {{ movie.imdbRating }}</div>

					<p class="movie-description">
						{{ movie.Plot }}
					</p>

					<div class="mb-4 mt-3">
						<BBadge
							variant="success"
							class="me-2"
							>{{ movie.Year }}</BBadge
						>
						<BBadge
							variant="success"
							class="me-2"
							>{{ movie.Runtime }}</BBadge
						>
						<BBadge
							variant="success"
							class="me-2"
							>{{ movie.Genre }}</BBadge
						>
						<BBadge
							variant="success"
							class="me-2"
							>{{ movie.Language }}</BBadge
						>
					</div>

					<table class="table small">
						<tbody>
							<tr>
								<th>Production</th>
								<td>{{ movie.Production }}</td>
							</tr>
							<tr>
								<th>Country</th>
								<td>{{ movie.Country }}</td>
							</tr>

							<tr>
								<th>Director</th>
								<td>{{ movie.Director }}</td>
							</tr>
							<tr>
								<th>Writer</th>
								<td>{{ movie.Writer }}</td>
							</tr>
							<tr>
								<th>Actors</th>
								<td>{{ movie.Actors }}</td>
							</tr>
							<tr>
								<th>Awards</th>
								<td>{{ movie.Awards }}</td>
							</tr>
						</tbody>
					</table>
				</BCol>
			</BRow>
		</div>
	</div>
</template>
<script>
import { ref, computed } from 'vue';
export default {
	props: {
		movie: {
			type: Object,
			default: null,
		},
	},
	setup(props, { emit }) {
		const defaultPosterBgUrl = ref(
			'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)'
		);
		const posterBg = computed(() =>
			props.movie ? `url(${props.movie.Poster})` : defaultPosterBgUrl.value
		);

		const posterStyle = computed(() => {
			return {
				'background-image': posterBg.value,
			};
		});

		const closeModal = () => {
			emit('emitCloseMovieModal');
		};

		return { posterStyle, closeModal };
	},
};
</script>
<style lang="scss" scoped>
.movie-info-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
	color: #fff;

	.movie-header-title {
		margin-bottom: 0;
		line-height: 1.5;
		font-size: 1.25rem;
	}
}

.movie-info-content {
	padding: 1rem;
	background-color: #fff;
}

.movie-poster-wrap {
	position: relative;
	padding-bottom: 150%;
	border-radius: 5px;
	overflow: hidden;
	transition: all 0.2s ease;
}

.movie-poster {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-position: center center;
	background-size: cover;
}

.movie-title {
	font-size: 3.5rem;
	font-weight: 300;
	line-height: 1.2;
}

.movie-rating {
	margin: 20px 0;
}

.movie-description {
	font-size: 1.25rem;
	font-weight: 300;
}
.close-icon {
	font-size: 24px;
	cursor: pointer;
}
</style>

<style lang="scss">
.movie-modal-content {
	background: transparent;
	.modal-body {
		padding: 0;
	}
}
</style>
