export interface TransferRequest {
	value: number;
	currency: string;
	payeerDocument: string;
	transferDate: string;
}

export interface TransferResponse {
	status: string;
	message: string;
}
