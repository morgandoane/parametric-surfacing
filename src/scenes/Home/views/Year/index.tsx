import { FC } from 'react';
import { Input } from '@headlessui/react';

export interface YearProps {
	value: number | null;
	onChange: (value: number | null) => void;
	next: () => void;
}

const Name: FC<YearProps> = ({ value, onChange, next }) => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<Input
				type="number"
				autoFocus
				value={value ?? ''}
				onChange={(e) => onChange(e.target.valueAsNumber)}
				placeholder="Birth Year"
				className="h-32 w-full text-center bg-zinc-950 text-heading-1 font-light border-none focus:outline-none text-white caret-zinc-200"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						next();
					}
				}}
			/>
		</div>
	);
};

export default Name;
