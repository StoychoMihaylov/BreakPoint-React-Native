//
// Note: This is just an example file to show how Redux can be implemented
// in React Native applications
//

import { ApiRequest, ApiResponse } from './apiTypes'

export interface DummyData {
    id: number
    userId: number
    title: string
    completed: boolean
}

export enum DummyActionTypes {
    GET_DUMMY_DATA = 'GET_DUMMY_DATA',
    GET_DUMMY_DATA_SUCCESS = 'GET_DUMMY_DATA_SUCCESS',
    GET_DUMMY_DATA_FAIL = 'GET_DUMMY_DATA_FAIL'
}

export type DummyAction =
    | {
          type: DummyActionTypes.GET_DUMMY_DATA
          payload: ApiRequest
      }
    | {
          type: DummyActionTypes.GET_DUMMY_DATA_SUCCESS
          payload: ApiResponse<DummyData>
      }
    | {
          type: DummyActionTypes.GET_DUMMY_DATA_FAIL
          payload: ApiResponse<null>
      }
