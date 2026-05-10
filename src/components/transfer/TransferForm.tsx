import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	formatDateToISO,
	TransferFormData,
	transferFormSchema
} from '../../validation';
import { Button, FormInput } from '../ui';
import { ApiError } from '../../types';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { postTransfer } from '../../services/transfer';
import { CurrencyInput } from '../ui/CurrencyInput';

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
			value: undefined,
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
				...data,
				currency: 'USD',
				transferDate: formatDateToISO(new Date())
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
			<CurrencyInput
				autoFocus
				required
				disabled={isPending}
				control={control}
				name="value"
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
