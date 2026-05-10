import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	...inputProps
}: FormInputProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<div className="flex flex-col gap-1">
					<label htmlFor={name} className="text-sm font-medium text-zinc-200">
						{label}

						{required && <span className="ml-1 text-red-500">*</span>}
					</label>
					<input
						id={name}
						{...field}
						{...inputProps}
						aria-invalid={fieldState.invalid}
						className={`
						h-10 rounded-lg border px-3 outline-none transition
						bg-zinc-950 text-white placeholder:text-zinc-500
						disabled:border-zinc-800
						disabled:cursor-not-allowed
						disabled:opacity-50
						focus:ring-4
						${
							fieldState.invalid
								? 'border-red-500 focus:border-red-500  focus:ring-red-500/30'
								: 'border-zinc-700 focus:border-primary  focus:ring-primary/30'
						}
						`}
					/>

					{fieldState.error && (
						<p className=" text-red-500">{fieldState.error.message}</p>
					)}
				</div>
			)}
		/>
	);
};
