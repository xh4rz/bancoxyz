import { AxiosError, isAxiosError } from 'axios';
import { ApiError } from '../types';

export const parseAxiosError = (error: unknown): ApiError => {
	if (isAxiosError<ApiError>(error)) {
		const axiosError = error as AxiosError<ApiError>;

		if (axiosError.response?.data) {
			console.error('Axios error response:', axiosError.response.data);
			return axiosError.response.data;
		}

		if (!axiosError.response) {
			console.error('API error response:', axiosError.message);
			return {
				message: axiosError.message
			};
		}
	}

	console.error('Unknown error', error);
	return {
		message: 'Unknown error'
	};
};
