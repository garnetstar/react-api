import React, {Component} from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import AjaxHelperClass from "../ajaxHelper";
import {Redirect} from 'react-router-dom';

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

        this.handleContent = this.handleContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
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

    handleSubmit(e) {
        e.preventDefault();
        const callback = function (res) {
            this.setState({justSaved: true});
        }.bind(this);
        this.state.ajaxHelper.articleSave(this.state.articleId, this.state.article.title, this.state.article.content, callback);

    }

    handleContent(e) {
        const content = e.target.value;
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
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="form-group">
								<textarea
                                    style={heightTextarea}
                                    ref={this.leftScroll}
                                    className='form-control'
                                    onChange={this.handleContent}
                                    onScroll={this.handleScroll}
                                    value={this.state.article.content}
                                    rows='25'
                                />
                            </div>
                            <div className='form-group'>
                                <input type='submit' value='add'/>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div
                                className='border markdownScroll'
                                ref={this.markDownScroll}
                                style={heightTextarea}
                            >
                                <MarkdownRenderer markdown={this.state.article.content}/>
                            </div>
                        </div>
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
