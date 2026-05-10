interface SpinnerProps {
	size?: number;
	className?: string;
}

export const Spinner = ({ size = 20, className = '' }: SpinnerProps) => {
	return (
		<div
			className={`
				animate-spin rounded-full
				border-2 border-white/30
				border-t-white
				${className}
			`}
			style={{
				width: size,
				height: size
			}}
		/>
	);
};
