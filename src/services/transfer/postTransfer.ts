import axiosClient from '../../api/axiosClient';
import { TransferRequest, TransferResponse } from '../../types';

const URL =
	'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer';

export const postTransfer = async (body: TransferRequest) => {
	try {
		const { data } = await axiosClient.post<TransferResponse>(URL, body);

		return data;
	} catch (error) {
		throw error;
	}
};
