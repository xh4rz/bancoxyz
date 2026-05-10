import { z } from 'zod';

export const transferFormSchema = z.object({
	value: z.number().min(1, 'Minimum amount is 1'),
	payeerDocument: z
		.string()
		.min(1, 'Document is required')
		.min(5, 'Document must be at least 5 characters')
});

export type TransferFormData = z.infer<typeof transferFormSchema>;
