import { useRouteMatch, Switch, Route, Link, useParams } from "react-router-dom";

import Demo01 from '../components/demo01'
import Demo02 from '../components/demo02'

export default function GamePage() {
	let { path, url } = useRouteMatch();

	return (
		<>
			<div>
				Demos to choose from:
				
				<Link to={ `${url}/demo01` }>Demo 01</Link> |
				<Link to={ `${url}/demo02` }>Demo 02</Link>
			</div>

			<Switch>
				<Route exact path={ path }><h3> Please select a demo.</h3></Route>
				<Route path={ `${url}/:demoId` }><Demo /></Route>
			</Switch>
		</>
	);
}


function Demo() {
	let { demoId } = useParams();

	switch(demoId) {
		case 'demo01' : return <Demo01 />;
		case 'demo02' : return <Demo02 />;

		default:
			return <h3 style={{ color: 'red' }}>Demo '{ demoId }' not in development yet.</h3>
	}
}