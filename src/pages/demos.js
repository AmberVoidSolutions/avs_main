import { useRouteMatch, Switch, Route, Link, useParams } from "react-router-dom";

import Demo01 from '../components/demo01'

export default function GamePage() {
	let { path, url } = useRouteMatch();

	return (
		<>
			Demos to choose from:
			
			<Link to={ `${url}/demo01` }>Demo 01</Link> |
			<Link to={ `${url}/demo02` }>Demo 02</Link>

			<Switch>
				<Route exact path={ path }><h3> Please select a demo.</h3></Route>
				<Route path={ `${url}/:demoId` }><Demo /></Route>
			</Switch>
		</>
	);
}


function Demo() {
	let { demoId } = useParams();

	if(demoId === 'demo01') { return <Demo01 /> }
	return <h3 style={{ color: 'red' }}>Demo '{ demoId }' not in development yet.</h3>;
}