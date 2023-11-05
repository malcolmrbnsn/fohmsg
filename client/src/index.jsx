import 'preact/debug';
import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Home } from './pages/Home/index.jsx';
import { Chat } from './pages/Chat/index.jsx';
import './style.css';

export function App() {
	return (
		<LocationProvider>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/chat" component={Chat} />
					<Route default component={Home} />
				</Router>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
