import { z } from 'zod';

export const scheduledTransferFormSchema = z.object({
	amount: z.number().min(1, 'Minimum amount is 1'),

	payeerDocument: z
		.string()
		.min(1, 'Document is required')
		.min(5, 'Document must be at least 5 characters'),

	scheduledDate: z
		.string()
		.min(1, 'Please select a date')
		.refine(
			(date) => {
				const selectedDate = new Date(date);
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				return selectedDate > today;
			},
			{
				message: 'The date must be a future date (tomorrow onwards)'
			}
		)
});

export type ScheduledTransferFormData = z.infer<
	typeof scheduledTransferFormSchema
>;
