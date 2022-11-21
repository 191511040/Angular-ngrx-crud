import { Appstate } from './../shared/store/appstate';
import { Injectable } from "@angular/core";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { deletebookAPISuccess, fetchbooksAPI, invokebooksAPI, invokedeletebookAPI, invokesavebooksAPI, invokeupdatebookAPI, savebooksAPIsucess, updatebookAPISuccess } from "./books.actions";


import { BooksService } from "./books.service";
import { Store ,select} from '@ngrx/store';
import { setapiStatus } from '../shared/store/app.action';
import { selectorBooks } from './store/books.selector';
import { EmptyExpr } from '@angular/compiler';



@Injectable()
export class BooksEffects {

  constructor(private actions$:Actions,private Bookservice:BooksService,private appStore:Store<Appstate>,private store:Store){

  }

  loadAllbooks$=createEffect(()=>
      this.actions$.pipe(ofType(invokebooksAPI),
      withLatestFrom(this.store.pipe(select(selectorBooks))),
      switchMap(([,booksFromstore])=>{
        if(booksFromstore.length>0){
          return EMPTY;
        }
        return this.Bookservice.get().pipe(map((data)=>fetchbooksAPI({allBooks:data})))
      }))
  )

  savenewbooks$=createEffect(()=>
    this.actions$.pipe(ofType(invokesavebooksAPI),switchMap((action)=>{
      this.appStore.dispatch(setapiStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.Bookservice.create(action.payload).pipe(map((data)=>{
        this.appStore.dispatch(setapiStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
        return savebooksAPIsucess({response:data})
      }));

    })
    )
  )
  updatebooks$=createEffect(()=>
    this.actions$.pipe(ofType(invokeupdatebookAPI),switchMap((action)=>{
      this.appStore.dispatch(setapiStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.Bookservice.update(action.payload).pipe(map((data)=>{
        this.appStore.dispatch(setapiStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
        return updatebookAPISuccess({response:data})
      }));

    })
    )
  )
  deletebooks$=createEffect(()=>
    this.actions$.pipe(ofType(invokedeletebookAPI),switchMap((action)=>{
      this.appStore.dispatch(setapiStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.Bookservice.delete(action.id).pipe(map((data)=>{
        this.appStore.dispatch(setapiStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
        return deletebookAPISuccess({id:action.id})
      }));

    })
    )
  )
}


