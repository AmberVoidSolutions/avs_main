import { Component } from 'react'

import styles from '../styles/contact.module.scss'

export default class ContactForm extends Component {
	constructor(props) {
		super(props);

		this.submitForm = this.submitForm.bind(this);
		this.changeData = this.changeData.bind(this);

		this.state = { error : '', success : '' }
	}


	submitForm(e) {
		e.preventDefault();

		if(!this.state.email) { this.setState({ error : 'Email address is required. Please enter a valid email address.' }); return; }
		if(!this.state.message) { this.setState({ error : 'Message is required. Please enter a message!' }); return; }

		const postURL = "/cgi-bin/server.pl"
		const postBody = { fullname : this.state.fullname, email : this.state.email, subject : this.state.subject, message : this.state.message }
		const reqMeta = {	method : 'POST',
							headers : { 'Content-Type' : 'application/json' },
							body : JSON.stringify(postBody)
						};

		fetch(postURL, reqMeta)
			.then(res => { if(!res.ok) { throw Error(res.statusText); } return res.json(); })
			.then(output => {
				this.setState({ success : 'Thank you for your enquiry - a representative will reply to you as soon as possible! (' + output.success + ')' });
			}).catch(error => {
				this.setState({ success : '', error : error.message });
			});
	}

	changeData(id, value) {
		let data = {};
		data[id] = value;
		this.setState(data);
	}

	render() {
		return (<>
			<form className={ styles.contactform } onSubmit={ (e) => this.submitForm(e) }>
				<p>Please leave your name, contact details and a message and we'll endeavour to reply as soon as we can.</p>
				
				<div className={ styles.inputform }>
					<Input id="fullname" text="Full Name" callback={ this.changeData } />
					<Input id="email" text="Email address" type="email" required callback={ this.changeData } />
					<Input id="subject" text="Subject" callback={ this.changeData } />
					<Input id="message" text="Message" long required callback={ this.changeData } />
				</div>

				{ this.state.error && <div className={ styles.error }>Error: { this.state.error }</div> }
				{ this.state.success && <div className={ styles.success }>{ this.state.success }</div> }

				<div className={ styles.submitform }>
					<button>Submit</button>
				</div>
			</form>
		</>)
	}
}

function Input({ id, text, type="text", long, required, callback }) {
	return (
			<div className={ styles.input }>
				<label htmlFor={ id }>{ text }:{ required && '*' }</label>
				{ long && <textarea className={ styles.inputbox } name={ id } onChange={ (e) => { callback(id, e.target.value) } }></textarea> }
				{ !long && <input className={ styles.inputbox } type={ type } name={ id }  onChange={ (e) => { callback(id, e.target.value) } } /> }{}
			</div>
		);
}