import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduledTransferFormData } from '../validation';

interface ScheduledTransferState {
	scheduledTransfers: ScheduledTransferFormData[];
	addTransfer: (transfer: ScheduledTransferFormData) => void;
	removeTransfer: (index: number) => void;
	clearExecutedTransfer: (transfer: ScheduledTransferFormData) => void;
}

export const useScheduledTransferStore = create<ScheduledTransferState>()(
	persist(
		(set) => ({
			scheduledTransfers: [],

			addTransfer: (transfer) =>
				set((state) => ({
					scheduledTransfers: [transfer, ...state.scheduledTransfers]
				})),

			removeTransfer: (index) =>
				set((state) => ({
					scheduledTransfers: state.scheduledTransfers.filter(
						(_, i) => i !== index
					)
				})),

			clearExecutedTransfer: (executed) =>
				set((state) => ({
					scheduledTransfers: state.scheduledTransfers.filter(
						(t) => t !== executed
					)
				}))
		}),
		{
			name: 'scheduled-transfers-storage'
		}
	)
);
