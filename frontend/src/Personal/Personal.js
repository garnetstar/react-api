import React, {Component} from 'react';
import ImageForm from '../Image/ImageForm';
import ImageList from '../Image/ImageList';

class Personal extends Component {
	constructor(props) {
		super(props);
		this.client = props.client;

		this.state = {
			refreshId: null
		}
	}

	render() {

		return (
			<div className='main-content'>
				<br/>
				<ImageList
					client={this.client}
					refreshId={this.state.refreshId}
				/>
				<br/>
				<ImageForm
					client={this.client}
					successCallback={(id) => {
						this.setState({refreshId: id});
						console.log('SSSSSSSSSSSs', id);
					}}
				/>
				<br/>

			</div>
		);
	}

	// loadImages() {
	// 	this.setState({refreshId: })
	// 	// this.client.getImages(
	// 	// 	(data) => console.log(data),
	// 	// 	(err) => console.log('Err: ', err)
	// 	// );
	// }
}

export default Personal;
