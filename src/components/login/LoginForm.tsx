import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginFormSchema } from '../../validation';
import { Button, FormInput } from '../ui';
import { ApiError } from '../../types';
import { SignInIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';

export const LoginForm = () => {
	const navigate = useNavigate();

	const { login, loading } = useAuthStore();

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

	const handleFormSubmit = async (data: LoginFormData) => {
		try {
			await login(data);
			navigate('/transfers');
		} catch (error) {
			const errorObj = error as ApiError;
			setError('root', {
				type: 'custom',
				message: errorObj.message
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="flex flex-col gap-4"
			noValidate
		>
			<FormInput
				autoFocus
				required
				disabled={loading}
				control={control}
				name="email"
				label="Email"
				placeholder="Enter your Email"
				type="email"
				autoComplete="email webauthn"
			/>
			<FormInput
				required
				disabled={loading}
				control={control}
				name="password"
				label="Password"
				placeholder="Enter your password"
				type="password"
				autoComplete="new-password webauthn"
			/>

			{errors.root && (
				<div className="rounded-lg p-3 text-sm  bg-red-500/10 text-red-500">
					{errors.root.message}
				</div>
			)}

			<Button
				type="submit"
				className="mt-4"
				loading={loading}
				iconLeft={<SignInIcon size={24} />}
			>
				Login
			</Button>
		</form>
	);
};
