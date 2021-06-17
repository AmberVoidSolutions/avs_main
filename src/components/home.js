import styles from '../styles/home.module.scss'

export default function Language({ name, logo, experience }) {
	return (<div className={ styles.languagecontainer }>
				<div className={ styles.duration } style={{ paddingTop: (experience * 5) + 'px' }}>
					{ experience } years
				</div>

				<div className={ styles.language }>
					{ name }
					<div className={ styles.imagecontainer }><img src={ 'images/languages/' + logo + '.png' } alt={ 'Logo for language ' + name } /></div>
				</div>
			</div>)
}