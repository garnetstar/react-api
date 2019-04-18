import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

class Personal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			source: '',
			showForm: true,
			showData: false,
			responseData: []
		};
		this.client = props.client;
		this.handleFile = this.handleFile.bind(this);
		this.handleSource = this.handleSource.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showUploaded = this.showUploaded.bind(this);
	}

	componentDidMount() {
		// this.client.get('/cdn/connect/',
		// 	function (result) {
		// 		console.log('Success', result)
		// 	},
		// 	function (result) {
		//
		// 	}
		// );
	}

	handleFile(e) {
		const file = e.target.value;
		this.setState({file: e.target.files[0]});
	}

	handleSource(e) {
		const source = e.target.value;
		this.setState({source: source})
	}

	handleSubmit(e) {
		e.preventDefault();

		this.client.cdnUpload(this.state.file, this.state.source, this.showUploaded);
	}

	render() {
		const showForm = this.state.showForm;
		const showData = this.state.showData;
		const data = this.state.responseData;

		return (
			<div className='main-content'>
				<br/>
				{showForm === true &&
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input type='file'
							   className='form-control'
							   onChange={this.handleFile}
						/>
						<input type='text'
							   className='form-control'
							   onChange={this.handleSource}
							   value={this.state.source}
						/>
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</form>
				}
				{
					showData === true &&
					<img src={data.thumbnailLink} />
				}
			</div>
		);
	}

	showUploaded(data) {
		this.setState({showForm: false, showData: true, responseData: data});
	}
}

export default Personal;
