import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { useAuthStore } from '../../store';

const mockNavigate = jest.fn();

jest.mock(
	'react-router-dom',
	() => ({
		useNavigate: () => mockNavigate
	}),
	{ virtual: true }
);

jest.mock('../../store', () => ({
	useAuthStore: jest.fn()
}));

describe('Pruebas en LoginForm', () => {
	const mockLogin = jest.fn();

	const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;

	const setup = () => {
		const user = userEvent.setup();

		render(<LoginForm />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);

		const submitButton = screen.getByRole('button');

		return {
			user,
			emailInput,
			passwordInput,
			submitButton
		};
	};

	const fillForm = async (
		user: ReturnType<typeof userEvent.setup>,
		email: string,
		password: string
	) => {
		await user.type(screen.getByLabelText(/email/i), email);

		await user.type(screen.getByLabelText(/password/i), password);
	};

	beforeEach(() => {
		jest.clearAllMocks();

		mockedUseAuthStore.mockReturnValue({
			login: mockLogin,
			loading: false
		});
	});

	test('1. Debe mostrar errores de validación si los campos están vacíos', async () => {
		const { user, submitButton } = setup();

		await user.click(submitButton);

		expect(await screen.findByText('Email is required')).toBeInTheDocument();

		expect(screen.getByText('Password is required')).toBeInTheDocument();

		expect(mockLogin).not.toHaveBeenCalled();
	});

	test('2. Debe llamar login y navegar cuando el formulario es válido', async () => {
		const { user, submitButton } = setup();

		mockLogin.mockResolvedValueOnce({});

		await fillForm(user, 'gabriel@topaz.com', '1111');

		await user.click(submitButton);

		expect(mockLogin).toHaveBeenCalledWith({
			email: 'gabriel@topaz.com',
			password: '1111'
		});

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith('/transfers');
		});
	});

	test('3. Debe mostrar mensaje de error en rojo cuando el login falla', async () => {
		const { user, submitButton } = setup();

		mockLogin.mockRejectedValueOnce({
			message: 'Credenciales inválidas'
		});

		await fillForm(user, 'error@test.com', 'wrongpass');

		await user.click(submitButton);

		const errorAlert = await screen.findByText(/credenciales inválidas/i);

		expect(errorAlert).toBeInTheDocument();

		expect(errorAlert).toHaveClass('text-red-500');

		expect(mockNavigate).not.toHaveBeenCalled();
	});

	test('4. Debe deshabilitar formulario cuando loading es true', () => {
		mockedUseAuthStore.mockReturnValue({
			login: mockLogin,
			loading: true
		});

		const { emailInput, passwordInput, submitButton } = setup();

		expect(emailInput).toBeDisabled();

		expect(passwordInput).toBeDisabled();

		expect(submitButton).toBeDisabled();
	});
});
