export interface TransferList {
	message: string;
	transfers: Transfer[];
}

export interface Transfer {
	value: number;
	date: string;
	currency: string;
	payeer: Payeer;
}

export interface Payeer {
	document: string;
	name: string;
}
