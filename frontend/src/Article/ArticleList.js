import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ArticleList extends Component {

	constructor(props) {
		super(props)

		this.state = {
			actualArticleId: props.actualArticleId,
			articles: props.articles
		}
	}

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.articles !== this.state.articles) {
			this.setState({articles: nextProps.articles});
		}

		if (nextProps.actualArticleId !== this.state.actualArticleId) {
			this.setState({actualArticleId: nextProps.actualArticleId})
		}
	}

	render() {
		return (
			<div className="list-group">
				{this.state.articles.map((article, key) =>
					<Link key={key}
						  to={`/article/${article.article_id}`}
						  className={`list-group-item list-group-item-action ${article.article_id === this.state.actualArticleId ? ' active' : ''}`}
					>
						{article.title}
					</Link>
				)}
			</div>
		)
	}
}

export default ArticleList