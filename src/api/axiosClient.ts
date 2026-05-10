import axios from 'axios';
import { StorageAdapter } from '../adapters';
import { parseAxiosError } from '../utils';

const axiosClient = axios.create({
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosClient.interceptors.request.use(
	async (config) => {
		const token = StorageAdapter.getItem('token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(parseAxiosError(error))
);

export default axiosClient;
