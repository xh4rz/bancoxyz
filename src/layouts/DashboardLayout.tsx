import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Balance } from '../components/balance';
import { getBalance } from '../services/transfer';
import { Button } from '../components/ui';

export const DashboardLayout = () => {
	const { data: dataBalance, isLoading: isLoadingBalance } = useQuery({
		queryKey: ['balance'],
		queryFn: getBalance,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false
	});

	return (
		<div className="flex flex-col gap-6 items-center p-6">
			<div className="flex gap-2">
				<Link to="/transfers">
					<Button className="h-8 bg-zinc-900 hover:bg-zinc-900">
						Post Transfer
					</Button>
				</Link>
				<Link to="/transfers-list">
					<Button className="h-8 bg-zinc-900 hover:bg-zinc-900">
						View All Transfers
					</Button>
				</Link>
			</div>

			<div className="w-full max-w-xs">
				<Balance
					balance={dataBalance?.accountBalance ?? 0}
					currency={dataBalance?.currency ?? 'USD'}
					loading={isLoadingBalance}
				/>
			</div>

			<Outlet />
		</div>
	);
};
