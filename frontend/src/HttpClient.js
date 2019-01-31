import axios from "axios/index";

export class HttpClient {

	constructor(token) {
		this.token = token;
	}

	get(url, successCallback, errorCallback) {

		axios.get(url, this.getHeader())
			.then((result) => successCallback(result))
			.catch((result) => errorCallback(result));
	}

	put(url, params, successCallback, errorCallback) {
		axios.put(
			url,
			params,
			this.getHeader()
		)
			.then((result) => successCallback(result))
			.catch((result) => errorCallback(result));
	}

	post(url, params, successCallback, errorCallback) {
		axios.post(
			url,
			params,
			this.getHeader()
		)
			.then((result) => successCallback(result))
			.catch((result) => errorCallback(result));
	}

	delete(url, successCallback, errorCallback) {
		console.log(['delete', url]);
		axios.delete(
			url,
			this.getHeader()
		)
			.then((result) => successCallback(result))
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
