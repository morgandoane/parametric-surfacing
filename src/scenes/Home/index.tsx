import { FC, ReactElement, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Simulation from './views/Simulation';
import Name from './views/Name';
import Country from './views/Country';
import Year from './views/Year';
import Intro from './views/Intro';
import Explanation from './views/Explanation';

export type View =
	| 'Name'
	| 'Country'
	| 'Year'
	| 'Intro'
	| 'Explanation'
	| 'Simulation';

export type State = {
	name: string;
	year: number | null;
	country: string;
};

const Home: FC = () => {
	const [view, setView] = useState<View>('Name');

	const [state, setState] = useState<State>({
		name: '',
		year: null,
		country: '',
	});

	const components: Record<View, ReactElement> = {
		Name: (
			<Name
				value={state.name}
				onChange={(name) => setState({ ...state, name })}
				next={() => setView('Country')}
			/>
		),
		Country: (
			<Country
				value={state.country}
				onChange={(country) => setState({ ...state, country })}
				next={() => setView('Year')}
			/>
		),
		Year: (
			<Year
				value={state.year}
				onChange={(year) => setState({ ...state, year })}
				next={() => setView('Intro')}
			/>
		),
		Intro: (
			<Intro
				next={() => setView('Explanation')}
				name={state.name}
				year={state.year}
				country={state.country}
			/>
		),
		Explanation: (
			<Explanation country={state.country} next={() => setView('Simulation')} />
		),
		Simulation: <Simulation state={state} />,
	};

	const component = components[view] || <div>Error</div>;

	return (
		<div className="h-screen bg-zinc-950 overflow-hidden">
			<AnimatePresence>
				<motion.div
					key={view}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{component}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Home;
