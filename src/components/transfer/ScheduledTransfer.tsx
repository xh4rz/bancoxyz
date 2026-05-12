import { useScheduledTransferStore } from '../../store';
import { ScheduledTransferForm, ScheduledTransferList } from './';

export const ScheduledTransfer = () => {
	const { scheduledTransfers, addTransfer, removeTransfer } =
		useScheduledTransferStore();

	return (
		<div className="flex flex-col gap-6">
			<ScheduledTransferForm addTransfer={addTransfer} />

			{scheduledTransfers.length > 0 && (
				<ScheduledTransferList
					items={scheduledTransfers}
					onRemove={removeTransfer}
				/>
			)}
		</div>
	);
};
