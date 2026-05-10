import { Navigate, Outlet } from 'react-router-dom';
import { StorageAdapter } from '../adapters';

export function PublicRoute() {
	const token = StorageAdapter.getItem('token');

	if (token) {
		return <Navigate to="/transfers" replace />;
	}

	return <Outlet />;
}
