import React, {Component} from 'react';
import ArticleDetail from './ArticleDetail';
import {Link} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import ArticleSearch from './ArticleSearch'
import ArticleList from './ArticleList'
import NewArticleLink from './NewArticleLink'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import Media from "react-media";

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
			articles: [],
			openMenu: true
		};

		this.mobSize = props.mobSize
		this.closeMenu = props.closeMenu
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
			this.setState(
				{
					articleId: nextProps.articleId,
				}, this.closeMenu
			)
		}

		if (nextProps.openMenu !== this.state.openMenu) {
			this.setState({openMenu: nextProps.openMenu})
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
			this.handleSaveArticle(e);
		}
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
		const articles = this.state.articles;
		const articleIdConst = parseInt(this.state.articleId, 10)
		console.log(['menu',this.props.openMenu, this.state.openMenu, this.state])
		const menuStyle = this.state.openMenu === true ?
			'slide-menu menu-show' : 'slide-menu menu-hide'
		const menu = <div>
			<NewArticleLink handleNewArticle={this.handleNewArticle}/>
			<ArticleSearch
				refSearchInput={this.refSearchInput}
				handleArticleSearch={this.handleArticleSearch}
			/>
			<ArticleList articles={this.state.articles} actualArticleId={articleIdConst}/>
		</div>

		const articleDetail = !isNaN(articleIdConst) && (
			<ArticleDetail
				articleId={articleIdConst}
				reloadArticles={this.reloadList}
				client={this.client}
			/>
		)

		return (
			<div>
				<Media query={{maxWidth: this.mobSize}}>
					{matches =>
						matches ? (
							<div className='row main-content'>
								<div className={menuStyle}>
									{menu}
								</div>
								<div className='col-sm-12'>
									{articleDetail}
								</div>
							</div>
						) : (
							<div className='row main-content'>
								<div className='col-sm-3 col-article-menu'>
									<div className='no-slide-menu'>
										{menu}
									</div>
								</div>
								<div className='col-sm-9'>
									{articleDetail}
								</div>
							</div>
						)
					}
				</Media>

				<Modal isOpen={this.state.showNewArticleModal} toggle={this.toggle}
					   className={this.props.className}>
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
