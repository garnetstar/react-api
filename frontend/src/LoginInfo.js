import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

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
			width: '21px',
			'margin-left': '10px'
		};
		return (
			<div>
				<a href="#" className='nav-link' onClick={this.logout}>
					<img style={divStyle} src={this.image}/>
					<span className='menuTitle'>
						<FontAwesomeIcon icon={faSignOutAlt}/>
					</span>
				</a>
			</div>
		);
	}
}

export default LoginInfo;



