import { deletebookAPISuccess, updatebookAPISuccess } from './../books.actions';

import { Books } from "./books";
import { createReducer, on } from '@ngrx/store';
import { fetchbooksAPI, savebooksAPIsucess } from "../books.actions";



export const  initialState:ReadonlyArray<Books>=[];


export const booksReducer = createReducer(
  initialState,
  on(fetchbooksAPI,(state,{allBooks})=>{
     return allBooks;
  }),
  on(savebooksAPIsucess,(state,{response})=>{
    let newState=[...state];
    newState.unshift(response);
    return newState
  }),
  on(updatebookAPISuccess,(state,{response})=>{
    let newState= state.filter(_=>_.id==response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deletebookAPISuccess,(state,{id})=>{
    let newState= state.filter(_=>_.id!==id);
    return newState;
  })
);
