import React, { Component } from 'react'

import styles from '../styles/timeline.module.scss'

const eventWidth = 250;
const eventHeight = 160;
const lineHeight = 5;

export default class Timeline extends Component {
	constructor(props) {
		super(props)

		this.updateDetails = this.updateDetails.bind(this);

		let updater = (index, left, top) => this.updateDetails(index, left, top);
		let events = this.props.events

		// Fill in missing years
		let maxyear = Math.max.apply(Math, events.map(event => event.year));
		if(maxyear < this.props.maxYear) maxyear = this.props.maxYear;
		let minyear = Math.min.apply(Math, events.map(event => event.year));
		

		// Sort by year (descending)
		events.sort(function(a, b) { return b.year - a.year; });
		
		// Create a list of years, and populate it with the events
		let years = {}
		for(let i = maxyear; i >= minyear; i--) { years[i] = { position : 0, events : [] } }
		events.forEach(function(event, i) {
			years[event.year].events.push({ ...event, eventIndex : i });
		})

		// Pre-calculate the object 'positions'
		let eventCount = 0
		Object.keys(years).reverse().forEach((year) => {
			years[year].position = eventCount

			let count = years[year].events.length + 1
			if(count > 1) count++
			eventCount += count / 2;

			// The duration bar can't know how long other 'years' are, so we calculate that here too
			years[year].events.forEach((event) => {
					if(event.duration > 0) {
						let yearTo = parseInt(year) + event.duration;
						event.durationWidth = years[yearTo > maxyear ? maxyear : yearTo].position
					}

					event.callback = (left, top) => updater(event.eventIndex, left, top)
				})
		})
		let totalWidth = eventCount


		this.state = {
						years,
						totalWidth,
						eventIndex : -1,
						dialogLeft : 0,
						dialogTop : 0,
					}
	}

	updateDetails(eventIndex, left, top) {
		this.setState({ eventIndex, dialogLeft : left, dialogTop : top });
	}


	render () {
		// Draw it
		return (
			<div className={ styles.timelineContainer } onClick={ () => this.updateDetails(-1, 0, 0) }>
				<div className={ styles.timeline }>
					{ this.state.eventIndex >= 0 &&
						<EventDetails event={ this.props.events[this.state.eventIndex] } left={ this.state.dialogLeft } top={ this.state.dialogTop }>
							
						</EventDetails>
					}


					{ Object.keys(this.state.years).map(year =>
						<Year year={ year } yearPos={ this.state.years[year].position } events={ this.state.years[year].events } key={ 'year-' + year } />
					) }

					<Line width={ this.state.totalWidth * eventWidth } />
				</div>
			</div>
			);
	}
}

function Year({ year, yearPos, events }) {
	return (
		<>
			<div className={ styles.year } style={{ left: yearPos * eventWidth }}>{ year }</div>
			{ events.map((event, i) => <Event index={ i } yearPos={ yearPos } event={ event } key={ 'event-' + i } />) }
		</>)
}

function Event({ index, yearPos, event }) {
	if(!event.title)
		return (<></>)

	let left = (yearPos * eventWidth) + ((index + 1) * (eventWidth / 2))
	let durationWidth = ((yearPos - event.durationWidth) * (eventWidth)) + ((index + 2) * (eventWidth / 2))

	let isOdd = index % 2 === 0
	let top   = isOdd ? 0 : eventHeight + lineHeight
	let style = isOdd ? styles.top : styles.bottom

	return (<div className={ styles.event } style={{ left, top }}>
				{ event.duration > 0 &&
					<div className={ styles.eventDuration } style={{ left : -durationWidth + (eventWidth / 2) + 'px',
																	 top : isOdd ? eventHeight - (lineHeight * 2): 0,
																	 width : durationWidth + 'px' }}></div>
				}

				{ isOdd ? <div className={ [ styles.connector, style ].join(' ') }></div> : '' }
				<div className={ styles.eventContainer }>
					<div className={ [ styles.eventText, style ].join(' ') } onClick={ (e) => { e.stopPropagation(); event.callback(left, top) } }>
						{ event.title }
					</div>
				</div>
				{ !isOdd ? <div className={ [ styles.connector, style ].join(' ') }></div> : '' }
		</div>)
}


function Line({ width }) {
	return (
		<div className={ styles.line } style={{ width }}></div>
	);
}


class EventDetails extends Component {
	constructor(props) {
		super(props)

		this.dialogRef = React.createRef()
	}

	componentDidMount() {
		this.dialogRef.current.scrollIntoView({ behavior : 'smooth', block: 'start', inline: 'nearest' })
	}

	componentDidUpdate() {
		this.dialogRef.current.scrollIntoView({ behavior : 'smooth', block: 'start', inline: 'nearest' })
	}

	render() {
		let event = this.props.event
		let left = this.props.left
		let top = this.props.top
		
		let durationPercent = event.duration * 10;
		if(durationPercent > 100) event.durationPercent = 100;
		durationPercent += '%';

		return (
			<div className={ styles.details } style={{ left : left < 0 ? 0 : left, top : top + (eventHeight / 2) + 'px' }} ref={ this.dialogRef }>
				<div className={ styles.title }>{ event.title }</div>
				{ event.duration > 0 && <div className={ styles.durationContainer }><div className={ styles.duration } style={{ width: durationPercent }}></div> { event.duration } year{ event.duration === 1 ? '' : 's' }</div> }
				{ event.skills && <div className={ styles.skills }>Skills: { event.skills.map((skill) => <span>{ skill }</span>) }</div> }
				<div className={ styles.description }>{ event.details }</div>
			</div>
		)
	}
}