import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RouteNavItem from "../RouteNavItem";
import AjaxHelperClass from "../ajaxHelper";
import { Redirect } from 'react-router-dom';

class ArticleDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articleId: this.props.articleId,
			article: null,
			isLoaded: false,
			ajaxHelper: AjaxHelperClass,
			redirectToArticle: null,
		};
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		fetch('/api/article/' + this.state.articleId)
			.then(res => res.json())
			.then((result) => {
					this.setState({
						article: result,
						isLoaded: true,
					})
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.articleId !== this.props.articleId) {
			fetch('/api/article/' + nextProps.articleId)
				.then(res => res.json())
				.then((result) => {
						this.setState({
							article: result,
							isLoaded: true,
						})
					},
					(error) => {
						this.setState({
							isLoaded: true,
							error
						});
					}
				);
		}
	}

	handleDelete(e) {

		if(window.confirm('really delete ?')) {
			const callback = function(res) {
				this.setState({redirectToArticle: '/article'});
			}.bind(this);
			this.state.ajaxHelper.articleDelete(this.state.article.article_id, callback);
		}
	}

	render() {
		if(this.state.redirectToArticle !== null) {
			const url = this.state.redirectToArticle;
			return(<Redirect to={url} />);
		}
		else if(this.state.isLoaded) {
			const url = '/article/edit/' + this.state.article.article_id;
			return(
				<div>
					<ul className='nav justify-content-end'>
						<li className='nav-item'>
							<RouteNavItem href={url} title="Edit">Edit</RouteNavItem>
						</li>
						<li className='nav-item'>
							<a className='nav-link' onClick={this.handleDelete} href='#'>delete</a>
						</li>
					</ul>

        <b>{this.state.article.title}</b>
				{this.state.article.content && (
						<MarkdownRenderer markdown={this.state.article.content} />
				)}


      </div>

			);
		} else {
			return(<div>Loading...</div>);
		}
	}

}
export default ArticleDetail;
