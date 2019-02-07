import { ApiRequest, ApiResponse } from './apiTypes'
import { DummyAction, DummyActionTypes } from './dummyTypes'

export enum CommonActionTypes {
    SET_DATA_LOADING = 'SET_DATA_LOADING'
}

export type ApiActionTypes = DummyActionTypes

export interface CommonAction {
    type: CommonActionTypes
    payload: boolean
}

export interface ApiAction<T = any> {
    type: ApiActionTypes
    payload: ApiResponse<T> | ApiRequest<T>
}

export type Action = DummyAction
export type Dispatch = (action: Action | Promise<Action>) => Action