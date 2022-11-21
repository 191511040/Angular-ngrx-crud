
import { setapiStatus } from './app.action';

import { createReducer, on, State } from '@ngrx/store';
import { initialState } from 'src/app/books/store/books.reducer';
import { Appstate } from './appstate';

export const initialstate:Appstate={
  apiStatus:'',
  apiResponseMessage:''
}

export const appReducer=createReducer(
  initialstate,
  on(setapiStatus,(state,{apiStatus})=>{
    return apiStatus;
  })
)
