import { Component } from 'react'

import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';


import '../styles/globals.scss'
import styles from '../styles/layout.module.scss'

import Home from '../pages/home'
import Timeline from '../pages/timeline'
import Employees from '../pages/employees'
import Contact from '../pages/contact'
import Demos from '../pages/demos'


let pages = [ { ref : 'home', title : 'Home', content : <Home /> },
			  { ref : 'timeline', title : 'Timeline', content : <Timeline /> },
			  { ref : 'employees', title : 'Employees', content : <Employees /> },
			  
			  { ref : 'demos', title : 'Demos', content : <Demos /> },
			  { ref : 'contact', title : 'Contact', content : <Contact /> }
			];

let helmetContext = {};

export default class Layout extends Component {
	constructor(props) {
		super(props)

		this.state = { cachedTime : this.props.settings ? this.props.settings.time : 0} //(_retrieveData('cachedTime') || 0) }
	}

	render() {
		return (
			<HelmetProvider context={ helmetContext }>
				<div className={ styles.body }>
					{/* Header */}
					<Router>
						<header className={ styles.header }>
							<img className={ styles.companylogo } src={ 'images/logo.png' } alt="Logo" />
							<div className={ styles.companyname }>AmberVoid<span className={ styles.solutions }>Solutions</span> Ltd.</div>

							<Menu entries={ pages } />
						</header>

						{/* Main */}
						<Article entries={ pages } />


						{/* Footer */}
						<footer className={ styles.footer }>
							Copyright &copy; 2021 Amber Void Solutions Ltd. All rights reserved.

							<br />
							 <a href="https://www.ecowebhosting.co.uk/" alt="Planting trees every month with Eco Web Hosting" rel="noopener" style={{ padding : 0 }}>
							 	<img src="https://eco-cdn.co.uk/eco-badge-5.svg" alt="Planting trees every month with Eco Web Hosting" style={{ padding : 0 }} />
							 </a> 
						</footer>
					</Router>
				</div>
			</HelmetProvider>
		)
	}
}

class Menu extends Component {
	constructor(props) {
		super(props);

		this.trigger = this.trigger.bind(this);

		this.state = { clicked : false };
	}

	trigger() {
		this.setState(prevState => ({ clicked : !prevState.clicked }) );
	}

	render() {
		let bar = []

		this.props.entries.forEach((page, i) => {
								bar.push( 
										<NavLink activeClassName={ styles.menuboxactive } className={ styles.reflink } to={ '/' + page.ref } key={ 'nav-' + i } onClick={ this.trigger }>
											{ page.title }
										</NavLink>
									)
							  }
		);

		return (
					<div className={ styles.navbar }>
						<span className={ [ styles.menubox, this.state.clicked ? styles.menuboxactive : '' ].join(' ') } onClick={ this.trigger }>&#9776;</span>

						<div className={ [ styles.menulist, this.state.clicked ? styles.menulistactive : '' ].join(' ') }>
							{ bar }
						</div>
					</div>
			)
	}
}

function Article({ entries }) {
	let pages = []

	entries.forEach((page, i) => {
		pages.push(<Route path={ '/' + page.ref } key={ 'route-' + i }>
						<Helmet>
							<title>{ page.title }</title>
							<meta name="title" content={ page.title } />
							<meta name="og:title" content={ page.title } />
						</Helmet>

						<div className={ styles.article }>
							{ (page.title !== 'Home') && ( <NavLink className={ styles.backToHome } to="/home">←Home</NavLink> ) }
							<h1>{ page.title }</h1>
							<br />

							{ page.content }
						</div>
					</Route>)
	})

	return (<Switch>
				<Route exact path="/"><Redirect to="/home" /></Route>
				{ pages }
			</Switch>)
}