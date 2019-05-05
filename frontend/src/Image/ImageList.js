import React, {Component} from 'react';

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

		console.log('IMAGES:', images);
		return (
			<div>
				{images !== [] &&
				<div>
					<ul className="pagination pagination-sm">{this.createPaginator()}</ul>
					{images.map((value, index) => {
							return (
								<div className='thumbnail'>
									<img className='img-thumbnail' key={index} width='100px' src={value.thumb_url}/>
								</div>
							);
						}
					)}

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

export default ImageList;