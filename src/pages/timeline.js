import Timeline from '../components/timeline'

let events = [	{ year : 2021, duration: 0, title : 'Private Company (Contracted Lead Developer)', skills : [ 'React', 'Python', 'MySQL' ],
											details : 'Created a small internal website with supporting back-end code and database to manage personal client data.' },

				{ year : 2020, duration: 1, title : 'ABG (Contracted 7.5t Delivery Driver)', skills : [ 'Class-C Driving' ],
											details : 'Delivered and installed white goods across the North-East UK. Quit due to health concerns amidst the Covid19 pandemic.' },

				{ year : 2019, duration: 1, title : 'Founded AmberVoid Solutions Ltd.',
											details : 'Founded this company as a way of allowing clients to hire our skills more professionally.' },

				{ year : 2019, duration: 1, title : 'Tag/Williams-Lea International (Contracted Lead Senior Developer)', skills : [ 'Perl', 'Python', 'React', 'jQuery' ],
											details : 'Worked for another year to finish previous projects and guide and train up the junior developers.' },

				{ year : 2013, duration: 7, title : 'Tag/Williams-Lea International (Senior Developer)', skills : [ 'Perl', 'Python', 'React', 'jQuery' ],
											details : 'Worked for several years designing and implementing full stack projects, primarily in jQuery and Perl. The codebase later moved to React and Python.' },

				{ year : 2010, duration: 1, title : 'Hull University', skills : [ 'C/C++', 'Java', 'Javascript' ],
											details : 'Completed a MSc in Games Programming.' },

				{ year : 2008, duration: 1, title : 'Accenture (Lead Developer)', skills : [ 'Perl' ],
											details : 'Spent a placement year at this company largely working on various Perl-based projects.' },

				{ year : 2006, duration: 4, title : 'Brighton University', skills : [ 'C/C++', 'Java' ],
											details : 'Completed a BSc in Computer Science.' }
			];

export default function TimeLine() {
	return (
		<>
			<a href="CV-20210616.pdf">[ Download the latest CV ]</a>
			<Timeline maxYear={ 2021 } events={ events } />
		</>
	)
}