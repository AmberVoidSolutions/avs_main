import { Component } from 'react'

import styles from '../styles/demo02.module.scss'

export default class Demo02 extends Component {
	render() {
		return (<>
			<h3>Inventory Automation Management System (IAMS)</h3>

			<div>Your IP Address: 0.0.0.0 [ Set Nickname ] [ Reset my data ]</div>

			<div>Inventory Available:</div>
			<ul className={ styles.inventorytable }>
				<li>Item 1 (15/30) (0.0.0.0) [ Purchase ] [ Edit ] [ Restock ]</li>
				<li>[ Add ]</li>l
			</ul>

			<div>Client Requests:</div>
			<ul>
				<li>Item 1 (15) [ Remove ]</li>
				<li>[ Add ]</li>
			</ul>
		</>)
	}
}


