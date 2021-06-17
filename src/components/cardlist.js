import React, { Component } from 'react'

import styles from '../styles/cardlist.module.scss'


export default class CardList extends Component {
	constructor(props) {
		super(props)

		this.selectEntry = this.selectEntry.bind(this);

		this.state = { selectedCategory : -1, selectedEntry : -1 }
	}


	componentDidMount() {
		// Select the first element by default
		this.selectEntry(0, 0);
	}

	selectEntry(categoryIndex, entryIndex) {
		this.setState({ selectedCategory : categoryIndex, selectedEntry : entryIndex });
	}

	render() {
		let children = this.props.cards.map((category, i) =>
								<Category	index={ i }
											key={ 'card-' + i }
											title={ category.category }
											entries={ category.entries }
											selectedEntry={ this.state.selectedCategory === i ? this.state.selectedEntry : -1 }
											callback={ this.selectEntry }
								/>
						)

		let selEntry = undefined
		if((this.state.selectedCategory >= 0) && (this.state.selectedEntry >= 0))
			selEntry = this.props.cards[this.state.selectedCategory].entries[this.state.selectedEntry];

		return (
			<div className={ styles.cardlistcontainer} >
				<div className={ styles.cardlist }>
					{ children }
				</div>

				{ selEntry && <Card title={ selEntry.title } subtitle={ selEntry.subtitle } image={ selEntry.image } text={ selEntry.description } quote={ selEntry.quote } /> }
			</div>
		);
	}
}

function Category({ index, title, entries, selectedEntry, callback }) {
	return (
		<>
			<h4 className={ styles.category }>{ title }</h4>
			{ entries.map((entry, i) => <Entry	title={ entry.title }
												key={ 'category-' + i }
												subtitle={ entry.subtitle }
												image={ entry.image }
												selected={ selectedEntry === i }
												callback={ () => callback(index, i) }
										/>
			) }
		</>
	);
}

function Entry({ title, subtitle, image, selected, callback }) {
	return (
		<div className={ [ styles.entry, selected ? styles.activeentry : '' ].join(' ') } onClick={ () => callback() }>
			<img src={ '/images/employees/thumb/' + image + '.png' } width={ 1 } height={ 1 } alt="??" layout="fixed" />
			{ title }
		</div>
	);
}





// Card details
function Card({ title, subtitle, image, text, quote }) {
	return (
		<div className={ styles.carddetails }>
			<div className={ styles.headercontainer }>
				<div className={ styles.title }><h4>{ title || '[No title]' }</h4><h5>{ subtitle || '' }</h5></div>
				<img src={ '/images/employees/' + image + '.png' } alt="Default" layout="fixed" />
			</div>

			<p>{ text || '[No text]' }</p>
			{ quote && <div className={ styles.quote }>{ quote }</div> }
		</div>
	);
}

