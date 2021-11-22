import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
    baseURL: "https://vq7wjnlflg.execute-api.sa-east-1.amazonaws.com/Prod/githubsyncer"
}

export default function httpClient(customConfig?: AxiosRequestConfig) {
    return axios.create({ ...config, ...customConfig });
}
