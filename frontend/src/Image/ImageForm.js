import React, {Component} from 'react';
import prettyBytes from 'pretty-bytes';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ImageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			source: '',
			tags: '',
			fileSize: '',
			showForm: true,
			showLoadr: false,
			showData: false,
			showError: false,
			showFormLink: false,
			responseData: []
		};
		this.client = props.client;
		this.successCallback = props.successCallback;
		this.handleFile = this.handleFile.bind(this);
		this.handleSource = this.handleSource.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
		this.handleTags = this.handleTags.bind(this);
		this.handleShowForm = this.handleShowForm.bind(this);
	}

	handleFile(e) {
		const file = e.target.value;
		const fileContent = e.target.files[0];
		this.setState({
			file: fileContent,
			fileSize: prettyBytes(fileContent.size)
		});
	}

	handleSource(e) {
		const source = e.target.value;
		this.setState({source: source})
	}

	handleTags(e) {
		const tags = e.target.value;
		this.setState({tags: tags});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			showLoader: true,
			showForm: false
		});
		this.client.cdnUpload(
			this.state.file,
			this.state.source,
			this.state.tags,
			this.onSuccess,
			this.onError
		);
	}

	handleShowForm(e) {
		e.preventDefault();
		this.setState({
			showForm: true,
			showLoader: false,
			showData: false,
			showError: false,
			showFormLink: false
		});


	}

	render() {
		const showFormLink = this.state.showFormLink;
		const showForm = this.state.showForm;
		const showData = this.state.showData;
		const data = this.state.responseData;
		const showLoader = this.state.showLoader;
		const showError = this.state.showError;
		const fileSize = this.state.fileSize;

		return (
			<div >
				{showFormLink === true &&
				<a
					href='#'
					onClick={this.handleShowForm}
				>
					Show upload form
				</a>
				}

				{showForm === true &&
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label>Image</label>
						<input
							type='file'
							className='form-control'
							onChange={this.handleFile}
						/>
						{
							fileSize !== '' &&
							<small className='form-text text-muted'>{fileSize}</small>
						}
					</div>
					<div className='form-group'>
						<label>Source</label>
						<input type='text'
							   className='form-control'
							   onChange={this.handleSource}
							   value={this.state.source}
						/>
					</div>
					<div className='form-group'>
						<label>Tags</label>
						<input
							type='text'
							className='form-control'
							onChange={this.handleTags}
							value={this.state.tags}
						/>
					</div>
					<div className='form-check'>
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</form>
				}
				{
					showLoader === true &&
					<div>Uploading ...</div>
				}
				{
					showData === true &&
					<div>
						<a href={data.url} target='_blank'>
							<img className='rounded' src={data.thumbnailLink}/>
						</a>
						<dl>
							<dt>{prettyBytes(parseInt(data.size))}</dt>
							<dt>{data.url}</dt>
							<dt>{data.thumbnailLink}</dt>
							<dt>{data.id}</dt>
						</dl>
						<CopyToClipboard text={data.thumbnailLink}>
							<a href='#'>Copy thumb</a>
						</CopyToClipboard>
					</div>
				}
				{
					showError === true &&
					<div>Error while uploading</div>
				}
			</div>
		);
	}

	onSuccess(data) {
		this.setState({
			source: '',
			tags: '',
			file: '',
			showForm: false,
			showLoader: false,
			showFormLink: true,
			fileSize: '',
			showData: true, responseData: data
		});

		this.successCallback();
	}

	onError(data) {
		console.log('uploadError', data);
		this.setState({
			file: '',
			showForm: false,
			showLoader: false,
			showData: false,
			showError: true,
			fileSize: '',
			showFormLink: true
		});
	}
}

export default ImageForm;