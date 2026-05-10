import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LoginPage, TransfersListPage, TransfersPage } from './pages';
import { PrivateRoute, PublicRoute } from './router';

function App() {
	return (
		<div className="bg-black min-h-screen p-6">
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<LoginPage />} />
				</Route>

				<Route element={<PrivateRoute />}>
					<Route element={<DashboardLayout />}>
						<Route path="/transfers" element={<TransfersPage />} />
						<Route path="/transfers-list" element={<TransfersListPage />} />
					</Route>
				</Route>

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
