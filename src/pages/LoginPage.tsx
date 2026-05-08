import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '../validation';
import { z } from 'zod';
import { Button, FormInput } from '../components';
import { SignInIcon } from '@phosphor-icons/react';

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginPage = () => {
	// const { login, loading } = useAuthStore();
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (data: LoginFormData) => {
		// try {
		// 	await login(data.email, data.password);
		// 	router.replace('/home');
		// } catch (error) {
		// 	const errorObj = error as ApiError;
		// 	if (errorObj.statusCode === 401) {
		// 		setError('root', {
		// 			type: 'custom',
		// 			message: 'Invalid credentials'
		// 		});
		// 		return;
		// 	}
		// 	setFormError(setError, errorObj);
		// }
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-black px-4">
			<div className="w-full max-w-sm rounded-xl bg-zinc-900 p-6 border border-zinc-800 shadow-lg">
				<h1 className="text-2xl font-bold text-secondary mb-6 text-center">
					Welcome to BancoXYZ
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormInput
						autoFocus
						required
						disabled={false}
						control={control}
						name="email"
						label="Email"
						placeholder="Enter your Email"
						type="email"
						autoComplete="email webauthn"
					/>

					<FormInput
						required
						disabled={false}
						control={control}
						name="password"
						label="Password"
						placeholder="Enter your password"
						type="password"
						autoComplete="new-password webauthn"
					/>

					<Button
						type="submit"
						className="mt-2 w-full"
						iconLeft={<SignInIcon size={24} />}
					>
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};
