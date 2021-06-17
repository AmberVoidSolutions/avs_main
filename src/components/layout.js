import { Component } from 'react'

import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';


import '../styles/globals.scss'
import styles from '../styles/layout.module.scss'

//import Sunset from './sunset'

import Home from '../pages/home'
import Timeline from '../pages/timeline'
import Employees from '../pages/employees'
//import Settings from '../pages/settings'
import Contact from '../pages/contact'

const siteTitle = 'AmberVoid Solutions Ltd.'
const siteMoniker = 'Official home of AmberVoid Solutions - dedicated to helping you design and implement technical solutions.'

let pages = [ { ref : 'home', title : 'Home', content : <Home /> },
			  { ref : 'timeline', title : 'Timeline', content : <Timeline /> },
			  { ref : 'employees', title : 'Employees', content : <Employees /> },
			  //{ ref : 'settings', title : 'Settings', content : <Settings /> },
			  { ref : 'contact', title : 'Contact', content : <Contact /> }
			];

export default class Layout extends Component {
	constructor(props) {
		super(props)

		this.state = { cachedTime : this.props.settings ? this.props.settings.time : 0} //(_retrieveData('cachedTime') || 0) }
	}

	static getDerivedStateFromProps(props, state) {
		if(props.settings && props.settings.time) {
			//_storeData( 'cachedTime', props.setting.time )
			return { cachedTime : props.settings.time }
		}
		return null;
	}

	render() {
		return (
			<div className={ styles.body }>
				<Helmet>
					<title>AmberVoid Solutions Ltd.</title>

					<link rel="icon" href="/logoicon.ico" />
					<meta name="title" content={ siteTitle } />
					<meta name="description" content={ siteMoniker } />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="http://ambervoid.co.uk/" />
					<meta property="og:title" content={ siteTitle } />
					<meta property="og:description" content={ siteMoniker } />
					<meta property="og:image" content={ 'images/logo.png' } />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="http://ambervoid.co.uk/" />
					<meta property="twitter:title" content={ siteTitle } />
					<meta property="twitter:description" content={ siteMoniker } />
					<meta property="twitter:image" content={ 'images/employees/charlie.png' } />
				</Helmet>

				

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
					</footer>
				</Router>
			</div>
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