'use client';

export function FetchApi() {
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method) {
        return async (url, body: any = null) => {
            console.log('request:', url, process.env.NEXT_PUBLIC_API_URL)

            const apiUrl = process.env.NEXT_PUBLIC_API_URL + url

            const requestOptions = {
                method,
                headers: authHeader(apiUrl),
                body
            };
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(apiUrl, requestOptions).then(handleResponse);
        }
    }

    // helper functions
    function authHeader(url) {
        const token = null;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }

    function handleResponse(response) {
        return response.text().then(text => {
            console.log("response:", text);

            const data = text && JSON.parse(text);

            if(response.ok) {
                return data;
            } else {
                if ([401, 403].includes(response.status)) {
                    localStorage.removeItem('user');
                    console.log('response not ok', response.status)
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        });
    }
}
