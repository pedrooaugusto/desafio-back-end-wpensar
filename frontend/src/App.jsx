import React from 'react';
import Login from './scenes/Login';
import Produtos from './scenes/Produtos';
import Compras from './scenes/Compras';
import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
const history = createBrowserHistory({});

function App(props) {
	return (
		<Router history = {history}>
			<Switch>
				<Route exact path="/">
					<Login history = {history}/>
				</Route>
				<Route exact path = "/produtos">
					<Produtos history = {history}/>
				</Route>
				<Route exact path = "/compras">
					<Compras history = {history}/>
				</Route>
				<Route path = "">
					<div style = {{textAlign: 'center'}}>
						<h1>ERROR 404</h1>
						<h2>omae wa mou shindeiru</h2>
						<h3>nani ?! nani, nani?</h3>
					</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
