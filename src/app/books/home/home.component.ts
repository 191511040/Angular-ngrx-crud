import { Appstate } from 'src/app/shared/store/appstate';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setapiStatus } from 'src/app/shared/store/app.action';
import { selectState } from 'src/app/shared/store/app.selector';
import { invokebooksAPI, invokedeletebookAPI } from '../books.actions';
import { selectorBooks } from '../store/books.selector';

declare var window:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store:Store,private appStore:Store<Appstate>) { }

  books$=this.store.pipe(select(selectorBooks))
  deleteModal:any;
  idtodeleteModal:any=0;

  ngOnInit(): void {
    this.deleteModal=new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    )
    this.store.dispatch(invokebooksAPI())
  }

  opendeleteModal(id:number){
    this.idtodeleteModal=id;
    this.deleteModal.show();
  }

  confirmdelete(){
    this.store.dispatch(invokedeletebookAPI({id:this.idtodeleteModal}));
    let appStatus$=this.appStore.pipe(select(selectState))
    appStatus$.subscribe((data)=>{
     if(data.apiStatus ==='success'){
       this.appStore.dispatch(setapiStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}));
       this.deleteModal.hide()
     }
    })
  }

}
