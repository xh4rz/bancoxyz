export interface AuthRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface User {
	id: number;
	name: string;
	email: string;
}
