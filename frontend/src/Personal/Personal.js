	import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

class Personal extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
			console.log(this.props);
		return (
			<div>
				Personal
			</div>
	)
		;

	}
}

export default Personal;
