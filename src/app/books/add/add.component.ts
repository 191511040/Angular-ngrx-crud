import { selectState } from './../../shared/store/app.selector';
import { Books } from './../store/books';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokesavebooksAPI } from '../books.actions';
import { Appstate } from 'src/app/shared/store/appstate';
import { Router } from '@angular/router';
import { setapiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private store:Store,private appStore:Store<Appstate>,private router:Router) { }

  bookform:Books={
    id:0 ,
  bookname: "",
  author: "" ,
  cost:0,

  }

  ngOnInit(): void {
  }

  save(){
    this.store.dispatch(invokesavebooksAPI({payload:{...this.bookform}}));
     let appStatus$=this.appStore.pipe(select(selectState))
     appStatus$.subscribe((data)=>{
      if(data.apiStatus ==='success'){
        this.appStore.dispatch(setapiStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}));
        this.router.navigate(['/']);
      }
     })

  }

}
