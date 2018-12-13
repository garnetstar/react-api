import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import LoginInfo from './LoginInfo.js';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login(response) {
		this.props.addAccessToken(response);
	}

	logout() {
		this.props.addAccessToken(null);
	}

	render() {
		const responseGoogle = (response) => {
			console.log(response);
		};
		const loginButton = < GoogleLogin
			clientId="192740429578-s8t31esln4b8ab64os5afg11imb93l35.apps.googleusercontent.com"
			buttonText="Login"
			onSuccess={this.login}
			onFailure={responseGoogle}
		/>;

		var show = null;

		if (this.props.accessToken === null) {
			show = loginButton;
		} else {
			console.log(this.state.accessToken);
			show = <LoginInfo googleResponse={this.props.accessToken} logout={this.logout}/>;
		}
		return (
			<div>
				{show}
			</div>
		);
	}
}

export default Login;