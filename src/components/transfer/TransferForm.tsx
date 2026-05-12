import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransferFormData, transferFormSchema } from '../../validation';
import { AmountInput, Button, FormInput } from '../ui';
import { ApiError } from '../../types';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTransfer } from '../../services/transfer';
import { formatDate } from '../../utils';

export const TransferForm = () => {
	const queryClient = useQueryClient();

	const [message, setMessage] = useState<{
		text: string;
		type: 'success' | 'error';
	} | null>(null);

	const { control, handleSubmit } = useForm<TransferFormData>({
		resolver: zodResolver(transferFormSchema),
		mode: 'onChange',
		defaultValues: {
			amount: undefined,
			payeerDocument: ''
		}
	});

	const { mutateAsync: transferMutation, isPending } = useMutation({
		mutationFn: postTransfer,
		onSuccess: (response) => {
			setMessage({
				text: response.message,
				type: 'success'
			});
			queryClient.invalidateQueries({
				queryKey: ['balance']
			});
		},
		onError: (error) => {
			const errorObj = error as ApiError;
			setMessage({
				text: errorObj.message,
				type: 'error'
			});
		}
	});

	const handleFormSubmit = async (data: TransferFormData) => {
		try {
			await transferMutation({
				value: data.amount,
				payeerDocument: data.payeerDocument,
				currency: 'USD',
				transferDate: formatDate(new Date())
			});
		} catch (error) {
			console.error(error);
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
				className="mt-4"
				loading={isPending}
				iconLeft={<PaperPlaneTiltIcon size={24} />}
			>
				Send Transfer
			</Button>
		</form>
	);
};
