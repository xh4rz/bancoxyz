import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageAdapter } from '../adapters';
import { postLogin } from '../services/auth';
import { AuthRequest, User } from '../types';

export interface AuthStoreState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	login: ({ email, password }: AuthRequest) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			loading: false,
			login: async ({ email, password }: AuthRequest) => {
				set({ loading: true });
				try {
					const resp = await postLogin({ email, password });
					set({ isAuthenticated: true, user: resp.user });
					StorageAdapter.setItem('token', resp.token);
				} catch (error) {
					throw error;
				} finally {
					set({ loading: false });
				}
			},
			logout: () => {
				set({ isAuthenticated: false, user: null });
				StorageAdapter.removeItem('token');
			}
		}),
		{
			name: 'auth-store',
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated
			})
		}
	)
);
