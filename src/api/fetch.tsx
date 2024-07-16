'use client';


interface ResponseData {
    code: number
    message: string
    data: any
}


export function FetchApi() {
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return (url: string, body: any = null) => {
            let apiUrl = url
            if(process.env.NEXT_PUBLIC_API_URL) {
                apiUrl = process.env.NEXT_PUBLIC_API_URL + url
            }

            const authToken = localStorage.getItem("authToken")  // get token from localStorage
            const requestHeaders = {
                "Auth-Token": authToken? authToken : "",
                "Content-Type": 'application/json'
            }

            const requestOptions: RequestInit = {
                method: method,
                headers: requestHeaders,
                credentials: 'include',
                body: null as any
            };
            if (body) {
                requestOptions.body = JSON.stringify(body);
            }

            return fetch(apiUrl, requestOptions)
                .then(response => {
                    if(response.ok) {
                        return response.json()
                    } else {
                        // console.log('response not ok:', response.statusText)
                        return Promise.reject(response.statusText)
                    }
                }).then(data => {
                    const rspPayload = data as ResponseData
                    if(rspPayload.code != 0) {
                        return Promise.reject(rspPayload.message)
                    } else {
                        return rspPayload.data
                    }
                });
        }
    }
}
