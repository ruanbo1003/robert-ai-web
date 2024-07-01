'use client';

export function FetchApi() {
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return async (url: string, body: any = null) => {
            console.log('request:', url, process.env.NEXT_PUBLIC_API_URL)

            const apiUrl = process.env.NEXT_PUBLIC_API_URL + url

            const token = null;   // get token from storage
            const requestHeaders = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }

            const requestOptions = {
                method: method,
                headers: requestHeaders,
                body
            };
            if (body) {
                requestOptions.body = JSON.stringify(body);
            }

            return fetch(apiUrl, requestOptions).then(handleResponse);
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
