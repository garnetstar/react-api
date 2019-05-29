import React, {Component} from 'react';

class Thumb extends Component {
	constructor(props) {
		super(props);

		this.data = props.data;

		this.state = {
			data: props.data,
			thumb_url: props.data.thumb_url
		};

		console.log(props);
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.data.thumb_url !== nextContext.thumb_url) {
			this.setState({thumb_url: './loader.jpg'});
			let url = nextProps.data.thumb_url;

			let image = new Image();
			image.src = url;
			image.onload = function () {
				this.setState({thumb_url: url});
			}.bind(this);
		}
	}

	//
	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if (nextProps.data !== prevState.data) {
	// 		let image = new Image();
	// 		image.onload = function () {
	//
	// 		}
	// 		return {data: nextProps.data};
	// 	} else {
	// 		return null;
	// 	}
	// }

	render() {
		return (
			<div className='thumbnail'>
				{/*<img src='./loader.jpg'/>*/}
				<img src={this.state.thumb_url}/>
			</div>
		);
	}
}

export default Thumb;