import { Navigate, Outlet } from 'react-router-dom';
import { StorageAdapter } from '../adapters';

export function PrivateRoute() {
	const token = StorageAdapter.getItem('token');

	if (!token) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
