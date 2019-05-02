import React, {Component} from 'react';
import ImageForm from '../Image/ImageForm';

class Personal extends Component {
	constructor(props) {
		super(props);
		this.client = props.client;
	}

	render() {
		return (
			<div className='main-content'>
				<br/>
				<ImageForm
					client={this.client}
					successCallback={() => this.loadImages()}
				/>
			</div>
		);
	}

	loadImages() {
		console.log('load list of images');
	}
}



export default Personal;
