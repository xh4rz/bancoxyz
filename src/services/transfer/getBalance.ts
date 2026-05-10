import axiosClient from '../../api/axiosClient';
import { Balance } from '../../types/balance';

const URL =
	'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance';

export const getBalance = async () => {
	try {
		const { data } = await axiosClient.get<Balance>(URL);

		return data;
	} catch (error) {
		throw error;
	}
};
