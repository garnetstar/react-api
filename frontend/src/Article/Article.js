import React, {Component} from 'react';
import ArticleDetail from './ArticleDetail';
import {Link} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import ArticleSearch from './ArticleSearch'
import ArticleList from './ArticleList'
import NewArticleLink from './NewArticleLink'

class Article extends Component {
	constructor(props) {
		super(props);
		console.log('constructor');
		this.state = {
			gyms: null,
			isLoaded: false,
			articleId: props.articleId,
			showNewArticleModal: false,
			newArticleTitle: null,
			newArticleId: null,
			articles: []
		};

		this.client = this.props.client;
		this.handleNewArticle = this.handleNewArticle.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleSaveArticle = this.handleSaveArticle.bind(this);
		this.handleNewArticleTitle = this.handleNewArticleTitle.bind(this);
		this.handleModalKeyPress = this.handleModalKeyPress.bind(this);
		this.refModalInput = React.createRef();
		this.refSearchInput = React.createRef();
		this.handleArticleSearch = this.handleArticleSearch.bind(this);
		this.reloadList = this.reloadList.bind(this);

	}

	componentDidMount() {
		console.log('didMount');
		console.log(this.state);
		this.setArticles()
		// this.refSearchInput.current.focus()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.articleId !== this.state.articleId) {
			console.log('new articleId');
			this.setState({articleId: nextProps.articleId})
		}

	}

	reloadList() {
		this.setArticles();
	}

	handleClickArticle(i, e) {
		this.setState({
			articleId: i,
		});
	}

	handleClickList(e) {
		e.preventDefault();
		this.setState({
			articleId: null,
		})
	}

	handleNewArticle(e) {
		e.preventDefault();
		this.setState({showNewArticleModal: true}, function () {
			this.refModalInput.current.focus();
		});

	}

	handleSaveArticle(e) {
		let params = {title: this.state.newArticleTitle};
		let url = '/api/article';

		this.client.put(
			url,
			params,
			(res) => {
				console.log(res);
				this.setState({newArticleId: res.data.article_id});
			},
			error => alert(error)
		)

		this.toggle();
	}

	handleArticleSearch(e) {
		// e.preventDefault();
		let word = e.target.value;
		let url;
		if (word === '') {
			url = '/api/article';
		} else {
			url = '/api/article/filter/title/' + word;
		}

		this.client.get(
			url,
			(result) => {
				this.setState({
					articles: result.data
				})
			},
			(error) => {
				this.setState({
					'error': error.toString()
				});
			}
		);
	}

	handleModalKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			// console.log(e.key);
			this.handleSaveArticle(e);
		}
	}

	handleGlobalPress(e) {
		console.log(e.key);
	}

	toggle() {
		this.setState({
			showNewArticleModal: !this.state.showNewArticleModal
		});
	}

	handleNewArticleTitle(e) {
		// console.log('handle title' + e.target.value);
		this.setState({newArticleTitle: e.target.value});
	}

	render() {
		if (this.state.newArticleId !== null) {
			const url = '/article/edit/' + this.state.newArticleId;
			return (<Redirect to={url}/>);
		}
		else if (this.state.error) {
			return (<b>{this.state.error}</b>);
		} else if (this.state.isLoaded === true) {
			return (
				this.renderList()
			);
		} else {
			return (
				<div>Loading...</div>
			);
		}
	}

	renderDetail() {
		return (
			<div>
				<ArticleDetail articleId={this.state.articleId} reloadArticles={this.reloadList} client={client}/>
			</div>);
	}

	renderList() {
		let articles = this.state.articles;
		console.log(['articles', articles]);
		const articleIdConst = parseInt(this.state.articleId, 10);
		return (
			<div onKeyPress={this.handleGlobalPress}>
				<div className='row'>
					{/*<div className='col-sm-3'>*/}
					<div className='slide-menu'>

						<NewArticleLink handleNewArticle={this.handleNewArticle} />
						<ArticleSearch refSearchInput={this.refSearchInput}  handleArticleSearch={this.handleArticleSearch}/>
						<ArticleList articles={this.state.articles} actualArticleId={articleIdConst}/>

					</div>

					<div className='col-sm-9'>

						{!isNaN(articleIdConst) && (
							<ArticleDetail
								articleId={articleIdConst}
								// accessToken={this.state.accessToken}
								reloadArticles={this.reloadList}
								client={this.client}
							/>
						)}
					</div>
				</div>


				<Modal isOpen={this.state.showNewArticleModal} toggle={this.toggle} className={this.props.className}>
					<form className='form-horizontal'>
						<ModalHeader toggle={this.toggle}>New Article</ModalHeader>
						<ModalBody>
							<div className='form-group'>
								<label htmlFor='articleTitle'>Title</label>
								<input type='text'
									   ref={this.refModalInput}
									   id='articleTitle'
									   className='form-control'
									   onChange={this.handleNewArticleTitle}
									   onKeyPress={this.handleModalKeyPress}
									   value={this.newArticleTitle}/>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.handleSaveArticle}>Create</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</form>
				</Modal>


			</div>
		);
	}

	setArticles() {
		this.client.get(
			'/api/article',
			(result) => {
				this.setState({
					articles: result.data,
					isLoaded: true,
				});
				this.refSearchInput.current.focus();
			},
			(error) => {
				console.log(error);
				this.setState({
					isLoaded: true,
					'error': error.toString()
				})
			}
		);
	}

}

export default Article;
