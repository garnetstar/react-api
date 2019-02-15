import React, {Component} from 'react';
import AjaxHelperClass from "../ajaxHelper";
import {Redirect} from 'react-router-dom';

const ReactMarkdown = require('react-markdown')
import TextAreaMD from '../TextAreaMD'

class ArticleEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articleId: this.props.articleId,
			article: null,
			isLoaded: false,
			content: this.props.content,
			ajaxHelper: AjaxHelperClass,
			justSaved: false,
			width: 0,
			height: 0
		};

		this.leftScroll = React.createRef();
		this.markDownScroll = React.createRef();
		this.client = this.props.client;

		this.handleContent = this.handleContent.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleTitle = this.handleTitle.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
		this.updateDimensions = this.updateDimensions.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}

	componentDidMount() {
		this.updateDimensions();
		this.client.get(
			'/api/article/' + this.state.articleId,
			(result) => {
				console.log(result.data);
				this.setState({
						article: result.data,
						isLoaded: true
					}
				)
			},
			(error) => {
				console.log(['error', error]);
				this.setState({
					isLoaded: true,
				})
			}
		);

	}

	handleSubmit(e) {
		e.preventDefault();
		let url = '/api/article/' + this.state.articleId;
		let params = {
			title: this.state.article.title,
			content: this.state.article.content
		};
		this.client.post(
			url,
			params,
			(result) => {
				this.setState({justSaved: true})
			},
			(error) => {
				console.log(['error', error]);
			}
		);
	}

	handleSave(e) {
		e.preventDefault();
		let url = '/api/article/' + this.state.articleId;
		let params = {
			title: this.state.article.title,
			content: this.state.article.content
		};
		this.client.post(
			url,
			params,
			(result) => {},
			(error) => {
				console.log(['error', error]);
			}
		);
	}

	handleCancel() {
		const url = '/article/' + this.state.articleId;
		return (<Redirect to={url}/>);
	}

	handleContent(content) {
		const newArticle = {title: this.state.article.title, content: content};
		this.setState({
			article: newArticle,
		});
	}

	handleScroll(e) {
		this.markDownScroll.current.scrollTop = this.leftScroll.current.scrollTop;
	}

	handleTitle(e) {
		const title = e.target.value;
		const newArticle = {title: title, content: this.state.article.content};
		this.setState({
			article: newArticle,
		});
	}

	updateDimensions() {
		this.setState(
			{
				width: window.innerWidth,
				height: window.innerHeight
			}
		);
		;
	}

	render() {
		let heightTextarea = {'height': (this.state.height - 180) + 'px'};
		if (this.state.justSaved === true) {
			const url = '/article/' + this.state.articleId;
			return (<Redirect to={url}/>);
		}
		else if (this.state.isLoaded === true) {
			return (
				<form onSubmit={this.handleSubmit}>
					<br/>
					<div className='row'>
						<div className='col-sm-12'>
							<div className='form-group'>
								<input className='form-control' type='text' onChange={this.handleTitle}
									   value={this.state.article.title}/>
							</div>
						</div>
					</div>
					<TextAreaMD content={this.state.article.content} height={this.state.height - 180}
								onChange={this.handleContent}/>
					<div className='form-group'>
						<input type='submit' value='Save' onClick={this.handleSave}/>
						<input type='submit' value='Save and leave'/>
						<input type='submit' value='Cancel' onClick={this.handleCancel}/>
					</div>
				</form>
			);
		} else {
			return (
				<div>Loading ...</div>
			);
		}
	}
}

export default ArticleEdit;
