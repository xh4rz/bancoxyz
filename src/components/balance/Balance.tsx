import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { formatCurrency } from '../../utils';
import { Button } from '../ui';

interface BalanceProps {
	balance: number;
	currency: string;
	loading: boolean;
}

export const Balance = ({ balance, currency, loading }: BalanceProps) => {
	const [isHidden, setIsHidden] = useState(true);

	const toggleVisibility = () => {
		setIsHidden((prev) => !prev);
	};

	const displayBalance = isHidden
		? '********'
		: formatCurrency(balance, currency);

	return (
		<div className="rounded-xl bg-zinc-900 p-6 border-2 border-zinc-800 shadow-lg">
			<div className="flex flex-col gap-2">
				<h2 className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
					Total Balance
				</h2>
				<div className="flex items-center justify-between gap-4">
					<div className="flex-1 min-w-0">
						{loading ? (
							<div
								data-testid="balance-skeleton"
								className="mt-1 h-12 animate-pulse rounded-lg bg-zinc-800"
							/>
						) : (
							<p className="min-h-12 flex items-center">
								<span className="inline-block  text-4xl font-bold text-white">
									{displayBalance}
								</span>
							</p>
						)}
					</div>
					<Button
						className="h-8 w-8 focus:ring-0"
						onClick={toggleVisibility}
						disabled={loading}
					>
						{isHidden ? <EyeIcon size={16} /> : <EyeSlashIcon size={16} />}
					</Button>
				</div>
			</div>
		</div>
	);
};
