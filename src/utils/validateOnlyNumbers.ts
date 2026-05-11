export const validateOnlyNumbers = (value: string): string | null => {
	const regex = /^\d*$/;
	return regex.test(value) ? value : null;
};
