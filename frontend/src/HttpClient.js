import axios from "axios/index";

export class HttpClient {

	constructor(token, loader) {
		this.token = token;
		this.loader = loader;
	}

	get(url, successCallback, errorCallback) {
		this.loader(true)
		axios.get(url, this.getHeader())
			.then((result) => {
				successCallback(result)
				this.loader(false)
			})
			.catch((result) => errorCallback(result));
	}

	put(url, params, successCallback, errorCallback) {
		this.loader(true)
		axios.put(
			url,
			params,
			this.getHeader()
		)
			.then((result) => {
				successCallback(result)
				this.loader(false)
			})
			.catch((result) => errorCallback(result));
	}

	post(url, params, successCallback, errorCallback) {
		this.loader(true)
		axios.post(
			url,
			params,
			this.getHeader()
		)
			.then((result) => {
				successCallback(result)
				this.loader(false)
			})
			.catch((result) => errorCallback(result));
	}

	delete(url, successCallback, errorCallback) {
		this.loader(true)
		console.log(['delete', url]);
		axios.delete(
			url,
			this.getHeader()
		)
			.then((result) => {
				successCallback(result)
				this.loader(false)
			})
			.catch((result) => errorCallback(result))
	}

	cdnUpload(file, source, tags, successCallback, errorCallback) {
		const formData = new FormData();
		formData.append('image',file);
		formData.append('source', source);
		formData.append('tags', tags);

		console.log('formdata', formData.getAll('image'));
		axios.post(
			'/cdn/upload',
			formData,
			this.getMultipartHeaders())
			.then((result) => {
				// successCallback(result)
				// this.loader(false)
				successCallback(result.data);
				console.log(['Success>>', result]);
			})
			.catch((result) => {
				console.log('ERROR', result);
				errorCallback(result);
			});
	}

	getHeader() {
		return {
			headers: {
				'Authorization': "Bearer " + this.token,
				'Content-Type': 'text/plain'
			}
		};
	}

	getMultipartHeaders() {
		return {
			headers: {
				'Authorization': "Bearer " + this.token,
				'content-type': 'multipart/form-data'
			}
		}
	}
}
