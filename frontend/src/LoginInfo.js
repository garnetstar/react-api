import React, {Component} from 'react';

class LoginInfo extends Component {
	constructor(props) {
		super(props);
		this.name = '';
		this.image = this.props.image;
		this.logout = this.logout.bind(this);
	}

	logout(e) {
		e.preventDefault();
		this.props.addAccessToken(null);
	}

	render() {
		console.log(this.image)
		var divStyle = {
			width: '30px',
			'margin-left': '10px'
		};
		return (
			<div>
				<a href="#" onClick={this.logout}>Logout</a>
				<img style={divStyle} src={this.image}/>
			</div>
		);
	}
}

export default LoginInfo;



