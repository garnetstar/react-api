import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: null
		};
		this.login = this.login.bind(this);
		// this.logout = this.logout.bind(this);
	}

	login(googleResponse) {
		const id_token = googleResponse.Zi.id_token;
		this.setState({imageUrl: googleResponse.profileObj.imageUrl})
		axios.post('/api/login', {'id_token': id_token}, {headers: {'Content-Type': 'text/plain'}})
			.then((response) => {
				const api_token = response.data.token;
				this.props.addAccessToken(api_token, googleResponse.profileObj.imageUrl);
			})
			.catch((response) => {
				alert(response);
				console.log(['error', response]);
			});
	}

	render() {
		const responseGoogle = (response) => {
			console.log(response);
		};

		var divStyle = {
			'margin-top': '100px'
		};

		return (
			<div>
				<div className='text-center'>
					<div style={divStyle}>
						< GoogleLogin
							clientId={process.env.GOOGLE_CLIENT_ID}
							buttonText="Login"
							onSuccess={this.login}
							onFailure={responseGoogle}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;