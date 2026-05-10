import { useQuery } from '@tanstack/react-query';
import { Balance } from '../components/balance';
import { getBalance } from '../services/transfer';

export const TransfersPage = () => {
	const { data: dataBalance, isLoading: isLoadingBalance } = useQuery({
		queryKey: ['balance'],
		queryFn: getBalance
	});

	return (
		<div className="flex justify-center">
			<div className="w-full max-w-xs">
				<Balance
					balance={dataBalance?.accountBalance ?? 0}
					currency={dataBalance?.currency ?? 'USD'}
					loading={isLoadingBalance}
				/>
			</div>
		</div>
	);
};
