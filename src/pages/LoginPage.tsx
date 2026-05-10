import { LoginForm } from '../components/login';

export const LoginPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm rounded-xl bg-zinc-900 p-6 border-2 border-zinc-800 shadow-lg">
				<h1 className="text-2xl font-bold text-secondary mb-6 text-center">
					Welcome to BancoXYZ
				</h1>
				<LoginForm />
			</div>
		</div>
	);
};
