import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books";

export const selectorBooks= createFeatureSelector<Books[]>("mybooks")

export const SelectBookbyId=(bookId:number)=>{
  return createSelector(
    selectorBooks,
  (book:Books[])=>{
    var bookByID=book.filter(_=>_.id==bookId);
    if(bookByID.length==0){
      return null;
    }
    return bookByID[0]
  }
  )
}
