import Klein from '@scenes/Klein';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const App: FC = () => {
	return (
		<Routes>
			<Route index element={<Klein />} />
		</Routes>
	);
};

export default App;
