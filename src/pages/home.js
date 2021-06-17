import { NavLink } from "react-router-dom";

import styles from '../styles/home.module.scss'

import Language from '../components/home'

export default function Home() {
	return (
		<div className={ styles.total }>
			<p>Welcome to the homepage of AmberVoid Solutions Ltd., a company dedicated to helping you design and implement technical solutions!</p>

			<NavLink  to='/contact'>
				<div className={ styles.advertise }>
					Why not contact us and see what we can do for you?
				</div>
			</NavLink>

			<p>We have years of academic and real-world experience, in languages and frameworks across the full stack - including:<br /><br />
				<Language name='Perl' logo='perl' experience='10' />
				<Language name='Python' logo='python' experience='3' />
				
				<Language name='C/C++' logo='c' experience='10' />
				<Language name='Java' logo='java' experience='5' />

				<Language name='MySQL' logo='mysql' experience='15' />

				<Language name='HTML' logo='html' experience='20' />
				<Language name='CSS' logo='css' experience='20' />
				<Language name='Javascript' logo='javascript' experience='15' />

				<Language name='React' logo='react' experience='4' />
				<Language name='Node.JS' logo='nodejs' experience='3' />
				<Language name='jQuery' logo='jquery' experience='9' />
			</p>
		</div>
	)
}