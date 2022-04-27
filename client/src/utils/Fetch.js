const SERVER_URI = 'http://localhost:5001';

const Fetch = async (url, body = {}, method = 'GET', access = true) => {
	try {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'http://localhost:3000');
		headers.append('GET', 'POST', 'OPTIONS');

		if (access) {
			const token = localStorage.getItem('access_token');
			headers.append('Authorization', token);
		}

		const response = await fetch(`${SERVER_URI}${url}`, {
			method: method,
			mode: 'cors',
			credentials: 'include',
			headers: headers,
			body: JSON.stringify(body),
		});
		const data = await response.json();

		if (data.access_token) {
			localStorage.setItem('access_token', data.access_token);
		}

		return {
			data,
			errMessage: data.message,
			status: response.ok,
			statusCode: response.status,
		};
	} catch (e) {
		console.log(e.message || e);
	}
};

export default Fetch;
