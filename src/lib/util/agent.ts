import type { Fetch, FetchResponse } from "../types";

let url = "http://localhost:21777/api/";

export const fetchJson = async (endPoint: string, fetchSve: Fetch = fetch): Promise<FetchResponse> => {
    // console.log(url + endPoint);
    const response = await fetchSve(url + endPoint);
    if (!response.ok) {
        // response is not ok, parse the error message from the response body
        let errorMessage = 'Unknown error';
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.message;
        } catch (e) {
            // If response body couldn't be parsed, use the status text as the error message
            errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    const headers = response.headers;
    return { data, headers };
}


export const postJson = async (endpoint: string, body: any): Promise<FetchResponse> => {
    const response = await fetch(url + `${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        let errorMessage = 'Unknown error';
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.message;
        } catch (e) {
            errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    const headers = response.headers;
    return { data, headers };
}