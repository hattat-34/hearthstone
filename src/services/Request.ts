import { Constants } from "../utils/Constants";
import { API } from "./API";

export interface HTTPRequest {
    uriPath: string,
    init: RequestInit
}

export const getJSON = async (uriPath: string) => {
    const request: HTTPRequest = {
        uriPath,
        init: {
            method: "GET",
            headers: {
                "x-rapidapi-key": Constants.apiKey,
                "x-rapidapi-host": Constants.host,
            }
        }
    }

    const response = await doRequest(request);
    return await response?.json()
}

const doRequest = async (request: HTTPRequest) => {
    const url = `${API.url}${request.uriPath}`
    try {
        const resp = await fetch(url, request.init)
        if (resp.status === 200)
            return resp;
        else
            console.log(`${resp.status} // ${request.init.method} ${resp.url}`)
    } catch (error) {
        //LOGGING
    }
}