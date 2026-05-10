import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { LoginFormData } from '../validation';
import { LoginForm } from '../components/login';

export const LoginPage = () => {
	const navigate = useNavigate();

	const { login, loading } = useAuthStore();

	const handleLogin = async (data: LoginFormData) => {
		await login(data);
		navigate('/transfers');
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm rounded-xl bg-zinc-900 p-6 border-2 border-zinc-800 shadow-lg">
				<h1 className="text-2xl font-bold text-secondary mb-6 text-center">
					Welcome to BancoXYZ
				</h1>

				<LoginForm loading={loading} onSubmit={handleLogin} />
			</div>
		</div>
	);
};
