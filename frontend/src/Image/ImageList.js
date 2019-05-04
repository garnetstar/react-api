import React, {Component} from 'react';

class ImageList extends Component {

	constructor(props) {
		super(props);
		this.client = props.client;

		this.state = {
			images: []
		};

		this.loadImages = this.loadImages.bind(this);
	}

	componentDidMount() {
		this.loadImages();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(this.props.refreshId !== nextProps.refreshId) {
			this.loadImages();
		}
	}

	render() {

		const images = this.state.images;

		return (
			<div>
				{images !== [] &&

				images.map((value, index) => {
						return <img key={index} width='100px' src={value.thumb_url} />
					}
				)
				}

			</div>
		);
	}

	loadImages() {
		this.client.getImages(
			(data) => {
				this.setState({images: data.data});
				console.log(data.data);
			},
			(err) => console.log('Err: ', err)
		);
	}
}

export default ImageList;