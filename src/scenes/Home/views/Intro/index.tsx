import firstName from '@utils/firstName';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@headlessui/react';

export interface IntroProps {
	next: () => void;
	name: string;
	year: number | null;
	country: string;
}

const Intro: FC<IntroProps> = ({ next, name, year, country }) => {
	return (
		<div className="text-white text-center h-screen flex flex-col justify-center gap-12">
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 0 }}
				className="text-heading-1"
			>
				Welcome, {firstName(name)}
			</motion.p>
			<div className="text-heading-3 text-zinc-200 flex flex-col gap-1">
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 1 }}
				>
					We are going to take you on a journey through time.
				</motion.p>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 2 }}
				>
					Beginning at your birth.
				</motion.p>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 3 }}
				>
					And onward through your next lives.
				</motion.p>
				<div className="h-12" />
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 4 }}
				>
					<Button
						onClick={() => {
							next();
						}}
						className="rounded-full bg-slate-50 text-zinc-800 text-body-large px-8 py-2"
					>
						Begin
					</Button>
				</motion.div>
			</div>
		</div>
	);
};

export default Intro;
