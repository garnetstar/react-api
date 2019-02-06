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

	getHeader() {
		return {
			headers: {
				'Authorization': "Bearer " + this.token,
				'Content-Type': 'text/plain'
			}
		};
	}
}
