import axiosClient from '../../api/axiosClient';
import { AuthRequest, AuthResponse } from '../../types';

const URL =
	'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login';

export const postLogin = async ({ email, password }: AuthRequest) => {
	try {
		const { data } = await axiosClient.post<AuthResponse>(URL, {
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};
