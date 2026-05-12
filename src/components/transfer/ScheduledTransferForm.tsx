import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, AmountInput } from '../ui';
import {
	ScheduledTransferFormData,
	scheduledTransferFormSchema
} from '../../validation';
import { CalendarPlusIcon } from '@phosphor-icons/react';

interface ScheduledTransferFormProps {
	addTransfer: (data: ScheduledTransferFormData) => void;
}

export const ScheduledTransferForm = ({
	addTransfer
}: ScheduledTransferFormProps) => {
	const [isPending, setIsPending] = useState(false);

	const [message, setMessage] = useState<{
		text: string;
		type: 'success' | 'error';
	} | null>(null);

	const tomorrow = new Date();

	tomorrow.setDate(tomorrow.getDate() + 1);

	const minDate = tomorrow.toISOString().split('T')[0];

	const { control, handleSubmit, reset } = useForm<ScheduledTransferFormData>({
		resolver: zodResolver(scheduledTransferFormSchema),
		mode: 'onSubmit',
		defaultValues: {
			amount: undefined,
			payeerDocument: '',
			scheduledDate: ''
		}
	});

	const handleFormSubmit = async (data: ScheduledTransferFormData) => {
		setIsPending(true);
		setMessage(null);

		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			addTransfer(data);

			setMessage({
				text: 'Transfer scheduled and saved!',
				type: 'success'
			});

			reset({
				amount: 0
			});

			setTimeout(() => setMessage(null), 5000);
		} catch (error) {
			setMessage({
				text: 'An error occurred',
				type: 'error'
			});
		} finally {
			setIsPending(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="flex flex-col gap-4"
			noValidate
		>
			<AmountInput
				autoFocus
				required
				disabled={isPending}
				control={control}
				name="amount"
				label="Amount"
				placeholder="Enter amount"
			/>

			<FormInput
				required
				disabled={isPending}
				control={control}
				name="payeerDocument"
				label="Document"
				placeholder="Enter document"
				type="text"
			/>

			<FormInput
				required
				control={control}
				name="scheduledDate"
				label="Execution Date"
				type="date"
				min={minDate}
			/>

			{message && (
				<div
					className={`rounded-lg p-3 text-sm ${
						message.type === 'error'
							? 'bg-red-500/10 text-red-500'
							: 'bg-green-500/10 text-green-500'
					}`}
				>
					{message.text}
				</div>
			)}

			<Button
				type="submit"
				loading={isPending}
				iconLeft={<CalendarPlusIcon size={24} />}
			>
				Schedule Transfer
			</Button>
		</form>
	);
};
