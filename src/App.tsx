import Home from '@scenes/Home';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const App: FC = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
		</Routes>
	);
};

export default App;
