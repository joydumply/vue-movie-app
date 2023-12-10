<template>
	<div class="header">
		<BNavbar
			toggleable="lg"
			variant="dark"
			v-b-color-mode="'dark'"
		>
			<BContainer class="d-flex justify-content-between align-items-center">
				<BNavbarBrand href="#">IMDb Movies</BNavbarBrand>
				<BNavbarToggle target="nav-collapse" />
				<BNavForm class="d-flex">
					<BFormInput
						class="me-2"
						placeholder="Search"
						v-model="searchInputValue"
					/>
				</BNavForm>
			</BContainer>
		</BNavbar>
	</div>
</template>
<script>
import { ref, watch } from 'vue';

export default {
	props: {},
	setup(props, { emit }) {
		const searchInputValue = ref('');
		let timeoutId = null;
		const delayedEmit = (value) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				emit('searchChanged', value);
			}, 300);
		};

		watch(searchInputValue, (newValue) => {
			console.log(newValue);
			delayedEmit(newValue);
		});

		return { searchInputValue };
	},
};
</script>
<style lang="scss" scoped>
.header {
	margin-bottom: 30px;
	.navbar {
		background-color: rgba(0, 0, 0, 0.7) !important;
		input {
			color: #fff;
			background-color: rgba(255, 255, 255, 0.1) !important;
			&:focus {
				box-shadow: none;
				color: #fff;
				background-color: rgba(255, 255, 255, 0.2) !important;
			}
		}
	}
}
</style>
