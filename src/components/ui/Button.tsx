import React, { cloneElement } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	iconLeft?: React.ReactElement;
	iconRight?: React.ReactElement;
}

export const Button = ({
	className = '',
	children,
	loading = false,
	iconLeft,
	iconRight,
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			className={`
				inline-flex items-center justify-center
				h-11 rounded-lg px-4
		    	text-white
				font-medium
				transition
				duration-300
                 bg-primary
				hover:bg-purple-700
				disabled:opacity-50
				disabled:cursor-not-allowed
                disabled:hover:bg-primary
				focus:outline-none
				focus:ring-primary/30
				focus:ring-4
				${className}
			`}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<Spinner />
			) : (
				<div className="flex gap-1">
					{iconLeft && cloneElement(iconLeft)}
					{children}
					{iconRight && cloneElement(iconRight)}
				</div>
			)}
		</button>
	);
};
