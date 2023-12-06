import axios from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	params: {
		apikey: import.meta.env.VITE_APP_API_KEY,
		plot: 'full',
	},
});

function returnData(res) {
	return res.data;
}

/**
 * * Interceptors - хуки перехвата запроса/ответа (в данном случае ответа)
 * * Сделано для того чтоб обработать объект response и привести к более удобному виду
 */

instance.interceptors.response.use(
	(response) => {
		return returnData(response);
	},
	(err) => {
		return Promise.reject(error);
	}
);

export default instance;
