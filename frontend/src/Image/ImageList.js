import React, {Component} from 'react';
import Thumb from './Thumb';

class ImageList extends Component {

	constructor(props) {
		super(props);
		this.client = props.client;

		this.state = {
			images: [],
			countPages: 0,
			actualPage: 1
		};

		this.loadImages = this.loadImages.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
	}

	componentDidMount() {
		this.loadImages();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.refreshId !== nextProps.refreshId) {
			this.loadImages();
		}
	}

	render() {

		const images = this.state.images;
		const countPages = parseInt(this.state.countPages);
		const thumbStyle = {}
		const cols = 3;
		const realCount = images.length;
		const rows = Math.ceil(realCount / cols);

		const chunks = chunkArray(images, cols);
		console.log('chunk', chunks);

		let newPage = false;
		console.log('IMAGES:', images);
		return (
			<div>
				{images !== [] &&
				<div>
					<ul className="pagination pagination-sm">{this.createPaginator()}</ul>
					<div>
						{chunks.map((row, index) => {
							// return(<div>row</div>);
							// console.log('row::', row);

							return (
								<div className='row'>

									{row.map(image => {
										return (
											<div className="col-sm-6 col-md-3">
												<Thumb data={image}/>
											</div>
										)
									})}

								</div>
							)
						})
						}

						{/*{images.map((value, index) => {*/}
						{/*		{*/}
						{/*			newPage = (index) % cols === 0 && index !== 0;*/}
						{/*		}*/}
						{/*		return (*/}
						{/*			<div className='col-sm-6 col-md-3'>*/}
						{/*				/!*<Thumb/>*!/*/}
						{/*				/!*<div className='thumbnail'>*!/*/}
						{/*				/!*<img className='img-thumbnail' key={index} width='150px' src={value.thumb_url}/>*!/*/}
						{/*				/!*</div>*!/*/}
						{/*			</div>*/}
						{/*		);*/}
						{/*	}*/}
						{/*)}*/}
					</div>
				</div>

				}

			</div>
		);
	}

	loadImages() {
		const actualPage = this.state.actualPage;

		this.client.getImages(actualPage,
			(data) => {
				this.setState({
					images: data.data.data,
					countPages: parseInt(data.data.pages)
				});
				console.log(data.data.data, data.data.pages, actualPage);
			},
			(err) => console.log('Err: ', err)
		);
	}

	handleChangePage(e, page) {
		e.preventDefault();

		this.setState({actualPage: page}, () => this.loadImages());
	}

	createPaginator() {
		const actual = this.state.actualPage;
		const count = this.state.countPages;

		let paginator = [];

		for (let i = 1; i <= count; i++) {
			const cssClass = 'page-item' + (actual === i ? ' disabled' : '');
			paginator.push(
				<li className={cssClass} key={i}>
					<a className="page-link" href="#" key={i} onClick={(e) => this.handleChangePage(e, i)}>{`${i}`}</a>
				</li>
			)
		}

		return paginator;
	}
}

function chunkArray(myArray, chunk_size) {
	var index = 0;
	var arrayLength = myArray.length;
	var tempArray = [];
	var myChunk;

	for (index = 0; index < arrayLength; index += chunk_size) {
		myChunk = myArray.slice(index, index + chunk_size);
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}

export default ImageList;