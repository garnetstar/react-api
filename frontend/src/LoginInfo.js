import React, {Component} from 'react';

class LoginInfo extends Component {
	constructor(props) {
		super(props);
		this.name = this.props.googleResponse.w3.ig;
		this.image = this.props.googleResponse.w3.Paa;
		this.logout = this.logout.bind(this);
	}

	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		console.log(this.googleResponse);
		return (
			<div>
				<img src={this.image}/>
				<a href="#" onClick={this.logout}>Logout</a>
			</div>
		);
	}
}

export default LoginInfo;



