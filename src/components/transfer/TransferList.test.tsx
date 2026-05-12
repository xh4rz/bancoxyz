import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQuery } from '@tanstack/react-query';
import { TransferList } from './TransferList';
import { TransferList as TransferListResponse } from '../../types';

jest.mock('@tanstack/react-query', () => ({
	useQuery: jest.fn()
}));

describe('TransferList', () => {
	const mockedUseQuery = useQuery as jest.Mock;

	const mockTransfers: TransferListResponse = {
		message: 'success',
		transfers: [
			{
				value: 1000,
				date: '2024-08-25',
				currency: 'USD',
				payeer: {
					document: '123',
					name: 'Harold'
				}
			},
			{
				value: 2000,
				date: '2023-06-10',
				currency: 'USD',
				payeer: {
					document: '456',
					name: 'Gabriel'
				}
			}
		]
	};

	const renderComponent = ({
		data,
		isLoading = false,
		isError = false
	}: {
		data?: TransferListResponse;
		isLoading?: boolean;
		isError?: boolean;
	} = {}) => {
		mockedUseQuery.mockReturnValue({
			data,
			isLoading,
			isError
		});

		render(<TransferList />);
	};

	const expectTransfersToBeVisible = () => {
		expect(screen.getByText('Harold')).toBeInTheDocument();
		expect(screen.getByText('Gabriel')).toBeInTheDocument();

		expect(screen.getByText('2024-08-25')).toBeInTheDocument();
		expect(screen.getByText('2023-06-10')).toBeInTheDocument();

		expect(screen.getByText('$1000')).toBeInTheDocument();
		expect(screen.getByText('$2000')).toBeInTheDocument();
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('1. Debe mostrar estado de carga', () => {
		renderComponent({ isLoading: true });

		expect(screen.getByText(/loading transfers/i)).toBeInTheDocument();
	});

	test('2. Debe mostrar mensaje de error si falla la consulta', () => {
		renderComponent({ isError: true });

		expect(
			screen.getByText(
				/an error has occurred; the transfers could not be loaded/i
			)
		).toBeInTheDocument();
	});

	test('3. Debe renderizar lista de transferencias', () => {
		renderComponent({ data: mockTransfers });

		expectTransfersToBeVisible();
	});

	test('4. Debe filtrar transferencias por nombre, monto y fecha', async () => {
		const user = userEvent.setup();

		renderComponent({ data: mockTransfers });

		const inputNombre = screen.getByPlaceholderText(/name/i);
		const inputMonto = screen.getByPlaceholderText(/amount/i);
		const inputFecha = screen.getByPlaceholderText(/date/i);

		// Filtrar por nombre
		await user.type(inputNombre, 'Harold');

		expect(screen.getAllByRole('listitem')).toHaveLength(1);

		expect(screen.getByText(/Harold/i)).toBeInTheDocument();

		await user.clear(inputNombre);

		// Filtrar por monto
		await user.type(inputMonto, '2000');

		expect(screen.getAllByRole('listitem')).toHaveLength(1);

		expect(screen.getByText(/\$2000/i)).toBeInTheDocument();

		await user.clear(inputMonto);

		// Filtrar por fecha
		await user.type(inputFecha, '2024-08-25');

		expect(screen.getAllByRole('listitem')).toHaveLength(1);

		expect(screen.getByText(/2024-08-25/i)).toBeInTheDocument();
	});

	test('5. Debe mostrar estado vacío cuando no hay resultados', async () => {
		const user = userEvent.setup();

		renderComponent({ data: mockTransfers });

		const inputNombre = screen.getByPlaceholderText(/name/i);

		await user.type(inputNombre, 'Pedro');

		expect(
			screen.getByText(/no se encontraron transferencias/i)
		).toBeInTheDocument();
	});

	test('6. Debe limpiar filtros al hacer click en "Limpiar filtros"', async () => {
		const user = userEvent.setup();

		renderComponent({ data: mockTransfers });

		const inputNombre = screen.getByPlaceholderText(/name/i);
		const inputMonto = screen.getByPlaceholderText(/amount/i);

		await user.type(inputNombre, 'Pedro');
		await user.type(inputMonto, '999');

		expect(
			screen.getByText(/no se encontraron transferencias/i)
		).toBeInTheDocument();

		const clearButton = screen.getByRole('button', {
			name: /limpiar filtros/i
		});

		await user.click(clearButton);

		expectTransfersToBeVisible();
	});
});
