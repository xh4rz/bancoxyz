import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, TransfersPage } from './pages';
import { PrivateRoute, PublicRoute } from './router';

function App() {
	return (
		<div className="bg-black min-h-screen p-6">
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<LoginPage />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/transfers" element={<TransfersPage />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
