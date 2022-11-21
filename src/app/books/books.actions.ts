import { Books } from './store/books';
import { createAction, props } from "@ngrx/store";

export const invokebooksAPI=createAction(
  "[Booksapi] inovoke books fetch API"
)

export const fetchbooksAPI=createAction(
  "[Books api] books fetch api sucess",props<{allBooks:Books[]}>()
)
export const invokesavebooksAPI=createAction(
  "[Booksapi] inovoke save books API",props<{payload:Books}>()
)
export const savebooksAPIsucess=createAction(
  "[Booksapi] invoke books save API success",props<{response:Books}>()
)
export const invokeupdatebookAPI=createAction(
  "[Booksapi] invoke books API",props<{payload:Books}>()
)
export const updatebookAPISuccess=createAction(
  "[Booksapi] invoke books API success",props<{response:Books}>()
)
export const invokedeletebookAPI=createAction(
  "[Booksapi] invoke delete books API",props<{id:number}>()
)
export const deletebookAPISuccess=createAction(
  "[Booksapi] delete books API success",props<{id:number}>()
)
