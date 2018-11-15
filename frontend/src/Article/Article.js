import React, {Component} from 'react';
import ArticleDetail from './ArticleDetail';
import {Link} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import AjaxHelperClass from "../ajaxHelper";
import {Redirect} from 'react-router-dom';


class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gyms: null,
			isLoaded: false,
			articleId: props.articleId,
			showNewArticleModal: false,
			newArticleTitle: null,
			newArticleId: null,
			ajaxHelper: AjaxHelperClass,
		};
		// this.setState({articleId: props.articleId});
		this.handleNewArticle = this.handleNewArticle.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleSaveArticle = this.handleSaveArticle.bind(this);
		this.handleNewArticleTitle = this.handleNewArticleTitle.bind(this);
		this.handleModalKeyPress = this.handleModalKeyPress.bind(this);
		this.refModalInput = React.createRef();
		this.refSearchInput = React.createRef();
		this.handleArticleSearch = this.handleArticleSearch.bind(this)
	}

	componentDidMount() {
		console.log(window.innerWidth);
		console.log(window.innerHeight);
		this.reloadList();
	}

	reloadList() {
		fetch('/api/article')
			.then(res => res.json())
			.then((result) => {
					this.setState({
						articles: result,
						isLoaded: true,
					});
					this.refSearchInput.current.focus();
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
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
		const callback = function (res) {
			res.json().then(json => {
				this.setState({newArticleId: json.article_id});
			});
		}.bind(this);
		this.state.ajaxHelper.articleAdd(this.state.newArticleTitle, callback);
		this.toggle();
	}

	handleArticleSearch(e) {
		// e.preventDefault();
		var word = e.target.value;
		var url;
		if(word === '') {
			url = '/api/article';
		} else {
			url = '/api/article/filter/title/' + word;
		}
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result);
					this.setState({articles: result});
				}
			);


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

	componentWillReceiveProps(nextProps) {
		this.setState({articleId: nextProps.articleId});
		if (!nextProps.articleId) {
			this.reloadList();
		}
		console.log('props ' + nextProps.articleId);
	}

	render() {
		if (this.state.newArticleId !== null) {
			const url = '/article/edit/' + this.state.newArticleId;
			return (<Redirect to={url}/>);
		}
		else if (this.state.error) {
			return (<b>Error</b>);
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

	renderDetail() {


		return(
			<div>
				<ArticleDetail articleId={this.state.articleId}/>
			</div>);
	}

	renderList() {
		let articles = this.state.articles;
		const articleIdConst = parseInt(this.state.articleId, 10);
		return (
			<div onKeyPress={this.handleGlobalPress}>
				<br/>
				<div className='row'>
					<div className='col-sm-3'>

						<ul className='nav'>
							<li className='nav-item'>
								<a className='nav-link' onClick={this.handleNewArticle} href='#'>New article</a>
							</li>
						</ul>

						<div className='form-group'>
							<input
								ref={this.refSearchInput}
								type='text'
								className='form-control'
								onChange={this.handleArticleSearch}
							/>
						</div>

						<div className="list-group">
							{articles.map((article, key) =>
								<Link key={key}
									  to={`/article/${article.article_id}`}
									  className={`list-group-item list-group-item-action ${article.article_id === articleIdConst ? ' active' : ''}`}
								>
									{article.title}
								</Link>
							)}
						</div>
					</div>

					<div className='col-sm-9'>

						{!isNaN(articleIdConst) && (
							<ArticleDetail articleId={articleIdConst}/>
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
}

export default Article;
