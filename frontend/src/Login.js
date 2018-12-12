import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.login = this.login.bind(this);
	}

	login(response) {
		this.props.addAccessToken(response);
	}
	logout(response) {
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
		const logoutButton = <GoogleLogout
			buttonText="Logout"
			onLogoutSuccess={responseGoogle}
		>
		</GoogleLogout>;

		var show = null;

		if(this.props.accessToken === null) {
			show = loginButton;
		} else {
			show = logoutButton;
		}
		return (
			<div>
				{show}
			</div>
		);
	}
}

export default Login;