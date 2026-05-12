import { TrashIcon, ClockAfternoonIcon } from '@phosphor-icons/react';
import { ScheduledTransferFormData } from '../../validation';

interface ScheduledTransferListProps {
	items: ScheduledTransferFormData[];
	onRemove: (index: number) => void;
}

export const ScheduledTransferList = ({
	items,
	onRemove
}: ScheduledTransferListProps) => {
	return (
		<div className="pt-6 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2">
			<h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
				<ClockAfternoonIcon size={18} />
				Upcoming Transfers
			</h3>

			<div className="flex flex-col gap-3">
				{items.map((item, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group hover:border-zinc-600 transition-colors"
					>
						<div className="flex flex-col">
							<span className="text-white font-bold text-sm">
								${item.amount.toLocaleString()}
							</span>

							<span className="text-zinc-500 text-[10px]">
								To: {item.payeerDocument} • {item.scheduledDate}
							</span>
						</div>
						<button
							onClick={() => onRemove(index)}
							className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
						>
							<TrashIcon size={18} />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
