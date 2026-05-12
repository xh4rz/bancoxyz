import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Balance } from '../components/balance/Balance';
import { formatCurrency } from '../utils';

describe('Pruebas críticas de Balance', () => {
	const props = {
		balance: 1000,
		currency: 'USD',
		loading: false
	};

	const formattedValue = formatCurrency(props.balance, props.currency);

	test('1. Debe mostrar estado de carga y deshabilitar el botón', () => {
		render(<Balance {...props} loading={true} />);

		const skeleton = screen.getByTestId('balance-skeleton');

		expect(skeleton).toBeInTheDocument();
		expect(skeleton).toHaveClass('animate-pulse');
		expect(screen.getByRole('button')).toBeDisabled();
	});

	test('2. Debe ocultar el saldo con 8 asteriscos inicialmente', () => {
		render(<Balance {...props} />);

		expect(screen.getByText('********')).toBeInTheDocument();
		expect(screen.queryByText(formattedValue)).not.toBeInTheDocument();
	});

	test('3. Debe revelar el saldo formateado ($1,000.00) al hacer clic', async () => {
		render(<Balance {...props} />);

		const button = screen.getByRole('button');

		await userEvent.click(button);

		expect(screen.getByText(formattedValue)).toBeInTheDocument();
	});
});
