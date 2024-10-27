import { FC } from 'react';
import { Input } from '@headlessui/react';

export interface CountryProps {
	value: string;
	onChange: (value: string) => void;
	next: () => void;
}

const Country: FC<CountryProps> = ({ value, onChange, next }) => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<Input
				autoFocus
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Country Where You Were Born"
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

export default Country;
