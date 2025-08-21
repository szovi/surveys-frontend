import axios, { type AxiosRequestConfig } from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export async function fetchData<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(url, config)
    return response.data
}