import { Component } from 'react'

export default class Settings extends Component {
	constructor(props) {
		super(props)

		this.state = { time : 0 }
	}

	render() {
		return (
			<input type="range" min="0" max="100" onChange={ (e) => this.setState({ time : e.target.value }) } />
		)
	}
}