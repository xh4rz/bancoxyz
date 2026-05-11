import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransferList } from '../../services/transfer';
import { TransferFilters } from './';

export const TransferList = () => {
	const {
		data: dataTransfers,
		isLoading: isLoadingTransfers,
		isError: isErrorTransfers
	} = useQuery({
		queryKey: ['transfers'],
		queryFn: getTransferList,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false
	});

	const [filters, setFilters] = useState({
		name: '',
		amount: '',
		date: ''
	});

	const clearFilters = () => {
		setFilters({ name: '', amount: '', date: '' });
	};

	const filteredTransfers = useMemo(() => {
		const transfers = dataTransfers?.transfers ?? [];

		if (!filters.name && !filters.amount && !filters.date) return transfers;

		return transfers.filter((t) => {
			const matchName =
				!filters.name ||
				t.payeer.name.toLowerCase().includes(filters.name.trim().toLowerCase());

			const matchAmount =
				!filters.amount || t.value.toString().includes(filters.amount);

			const matchDate = !filters.date || t.date === filters.date;

			return matchName && matchAmount && matchDate;
		});
	}, [dataTransfers?.transfers, filters]);

	if (isLoadingTransfers)
		return <p className="text-white">Loading transfers...</p>;

	if (isErrorTransfers)
		return (
			<p className="text-white">
				An error has occurred; the transfers could not be loaded.
			</p>
		);

	return (
		<div className="flex flex-col gap-4">
			<TransferFilters
				name={filters.name}
				amount={filters.amount}
				date={filters.date}
				onChange={setFilters}
			/>

			<ul className="space-y-3">
				{filteredTransfers.length > 0 ? (
					filteredTransfers?.map((transfer) => (
						<li
							key={`${transfer.payeer.document}-${transfer.date}`}
							className="p-3 border border-zinc-700 rounded-md flex justify-between"
						>
							<div>
								<p className="font-semibold text-white">
									{transfer.payeer.name}
								</p>
								<p className="text-sm text-gray-500">{transfer.date}</p>
							</div>

							<p className="font-bold text-white">${transfer.value}</p>
						</li>
					))
				) : (
					<div className="h-40 flex flex-col justify-center items-center">
						<span className="text-zinc-500 font-medium">
							No se encontraron transferencias
						</span>
						<button
							onClick={clearFilters}
							className="text-xs text-secondary mt-2 hover:underline"
						>
							Limpiar filtros
						</button>
					</div>
				)}
			</ul>
		</div>
	);
};
