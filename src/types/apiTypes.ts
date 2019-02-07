import { ApiActionsTypes } from './actionTypes'

export interface ApiRequest<T = any> {
    request: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'
        url: string
        date?: T
    }
}

export interface ApiResponse<T> {
    type: ApiActionsTypes
    data: T
}