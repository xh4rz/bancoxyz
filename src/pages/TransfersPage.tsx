import { useState } from 'react';
import { TransferForm, ScheduledTransfer } from '../components/transfer';
import { CalendarBlankIcon, ArrowLeftIcon } from '@phosphor-icons/react';

export const TransfersPage = () => {
	const [showScheduled, setShowScheduled] = useState(false);

	return (
		<div className="w-full max-w-sm rounded-xl bg-zinc-900 p-6 border-2 border-zinc-800 shadow-lg">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-xl font-bold text-white">
					{showScheduled ? 'Schedule' : 'Transfer'}
				</h2>

				<button
					onClick={() => setShowScheduled(!showScheduled)}
					className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700"
				>
					{showScheduled ? (
						<>
							<ArrowLeftIcon size={14} />
							Go back
						</>
					) : (
						<>
							<CalendarBlankIcon size={14} />
							Schedule future
						</>
					)}
				</button>
			</div>

			{showScheduled ? <ScheduledTransfer /> : <TransferForm />}

			<p className="mt-4 text-center text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
				{showScheduled ? '• Planned for later •' : '• Ready to send •'}
			</p>
		</div>
	);
};
