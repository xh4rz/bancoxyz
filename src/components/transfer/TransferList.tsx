import { useQuery } from '@tanstack/react-query';
import { getTransferList } from '../../services/transfer';

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

	if (isLoadingTransfers) return <p>Cargando transferencias...</p>;

	if (isErrorTransfers) return <p>Error al cargar transferencias</p>;

	return (
		<div>
			<ul className="space-y-3">
				{dataTransfers?.transfers.map((transfer) => (
					<li
						key={crypto.randomUUID()}
						className="p-3 border border-secondary rounded-md flex justify-between"
					>
						<div>
							<p className="font-semibold text-primary">
								{transfer.payeer.name}
							</p>
							<p className="text-sm text-gray-500">{transfer.date}</p>
						</div>

						<p className="font-bold text-white">${transfer.value}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
