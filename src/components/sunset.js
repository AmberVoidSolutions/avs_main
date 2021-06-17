import styles from '../styles/sunset.module.scss'

import { Component } from 'react'



export default class Sunset extends Component {
	render() {
		let time = this.props.time

		let leftTrack = (time / 1.1);
		let leftPercent = leftTrack + '%'

		let topDeg = 180 - ((180 / 100) * time);
		let topRad = (Math.PI / 180) * topDeg;
		let topTrack = (Math.sin(topRad) * 50) ;
		let topPercent = topTrack + '%';


		let sun = <div className={ styles.sun } style={{ bottom: topPercent, left: leftPercent }}></div>
		let sunhalo = <div className={ styles.sunhalo } style={{ bottom: "calc(" + topPercent +" - 50px)", left: "calc(" + leftPercent + " - 50px)" }}></div>


		let navy = { h : 240, s : 100, l : 10 }
		let purple = { h : 300, s : 100, l : 25 }
		let orange = { h : 39, s : 100, l : 50 }
		let lightblue = { h : 195, s : 53, l : 79 }
		let grad = "linear-gradient(to bottom, " + toHSLA(navy, topTrack) + " 0%, "
												+ toHSLA(purple, topTrack) + ", "
												+ toHSLA(orange, topTrack) + " calc(" + parseInt(50 - topTrack) + "% - 100px), "
												+ toHSLA(lightblue, 100) +
										")";


		return (
			<>
				<div className={ styles.sky } style={{ background: grad }}>
					{ sunhalo }
					{ sun }
				</div>
			</>
		)
	}
}


function toHSLA({ h, s, l, a=1 }, multiplier) {
	if(multiplier < 50) multiplier = 50;

	l *= multiplier * 0.01;
	return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
}