import React, {Component} from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RouteNavItem from "../RouteNavItem";
import AjaxHelperClass from "../ajaxHelper";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import HttpClient from "../HttpClient.js";

class ArticleDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articleId: this.props.articleId,
			article: null,
			isLoaded: false,
			ajaxHelper: AjaxHelperClass,
			redirectToArticle: null
		};
		this.client = this.props.client;
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.setArticleDetail(this.state.articleId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.articleId !== this.props.articleId) {
			this.setArticleDetail(nextProps.articleId);
		}
	}

	handleDelete(e) {

		if (window.confirm('really delete ?')) {
			let url = '/api/article/' + this.state.article.article_id;

			this.client.delete(
				url,
				(res) => {
					console.log('redirect');
					this.props.reloadArticles();
					this.setState({redirectToArticle: '/article'});
				},
				(error) => {
					alert('error in handleDelete' + error)
				}
			);
			// .then(res => {
			// 	this.props.reloadArticles();
			// 	console.log('redirect');
			// 	this.setState({redirectToArticle: '/article'});
			// })
			// .catch(error => alert('error in handleDelete' + error));
		}
	}

	render() {
		if (this.state.redirectToArticle !== null) {
			const url = this.state.redirectToArticle;
			return (<Redirect to={url}/>);
		}
		else if (this.state.isLoaded) {
			const url = '/article/edit/' + this.state.article.article_id;
			return (
				<div>
					<ul className='nav justify-content-end'>
						<li className='nav-item'>
							<RouteNavItem href={url} title="Edit">Edit</RouteNavItem>
						</li>
						<li className='nav-item'>
							<a className='nav-link' onClick={this.handleDelete} href='#'>delete</a>
						</li>
					</ul>

					<h1>{this.state.article.title}</h1>
					{this.state.article.content && (
						<MarkdownRenderer markdown={this.state.article.content}/>
					)}
				</div>
			);
		} else {
			return (<div>Loading...</div>);
		}
	}

	setArticleDetail(articleId) {
		this.client.get(
			'/api/article/' + articleId,
			(result) => {
				this.setState({
					article: result.data,
					isLoaded: true,
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					'error': error.toString()
				});
			}
		);
	}
}

export default ArticleDetail;
