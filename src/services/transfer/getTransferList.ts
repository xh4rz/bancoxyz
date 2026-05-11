import axiosClient from '../../api/axiosClient';
import { TransferList } from '../../types';

const URL =
	'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList';

export const getTransferList = async () => {
	try {
		const { data } = await axiosClient.get<TransferList>(URL);

		return data;
	} catch (error) {
		throw error;
	}
};
