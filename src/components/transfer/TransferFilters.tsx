import DatePicker from 'react-datepicker';
import { formatDate, validateOnlyNumbers } from '../../utils';
import 'react-datepicker/dist/react-datepicker.css';

interface TransferFiltersProps {
	name: string;
	amount: string;
	date: string;
	onChange: (filters: { name: string; amount: string; date: string }) => void;
}

export const TransferFilters = ({
	name,
	amount,
	date,
	onChange
}: TransferFiltersProps) => {
	const handleChange = (field: string, value: string) => {
		onChange({
			name,
			amount,
			date,
			[field]: value
		});
	};

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const cleanValue = validateOnlyNumbers(e.target.value);
		if (cleanValue !== null) {
			handleChange('amount', cleanValue);
		}
	};

	return (
		<div>
			<div className="text-white mb-2">Filter by:</div>
			<div className="flex gap-3">
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => handleChange('name', e.target.value)}
					className="input-filter"
				/>
				<input
					type="text"
					inputMode="numeric"
					placeholder="Amount"
					value={amount}
					onChange={handleAmountChange}
					className="input-filter"
				/>
				<div className="w-40 flex-shrink-0">
					<DatePicker
						placeholderText="Date"
						selected={date ? new Date(date.replace(/-/g, '/')) : null}
						onChange={(date: Date | null) =>
							handleChange('date', date ? formatDate(date) : '')
						}
						dateFormat="yyyy-MM-dd"
						className="input-filter"
					/>
				</div>
			</div>
		</div>
	);
};
