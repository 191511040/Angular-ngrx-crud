import { Appstate } from 'src/app/shared/store/appstate';
import { switchMap } from 'rxjs';
import { SelectBookbyId } from './../store/books.selector';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Books } from '../store/books';
import { ActivatedRoute, Router } from '@angular/router';
import { invokeupdatebookAPI } from '../books.actions';
import { selectState } from 'src/app/shared/store/app.selector';
import { setapiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  bookform:Books={
    id:0 ,
  bookname: "",
  author: "" ,
  cost:0,

  }
  constructor(private store:Store,private route:ActivatedRoute,private router:Router,private appStore:Store<Appstate>) { }

  ngOnInit(): void {
    let fetchFormData$=this.route.paramMap.pipe(
      switchMap((param)=>{
        var id=Number(param.get('id'))
        return this.store.pipe(select(SelectBookbyId(id)))
      })
    )
    fetchFormData$.subscribe((data)=>{
      if(data){
        this.bookform={...data}
      }
      else{
         this.router.navigate(['/']);
      }
    })

  }
  update(){
    this.store.dispatch(invokeupdatebookAPI({payload:{...this.bookform}}))
    let appStatus$=this.appStore.pipe(select(selectState))
    appStatus$.subscribe((data)=>{
     if(data.apiStatus ==='success'){
       this.appStore.dispatch(setapiStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}));
       this.router.navigate(['/']);
     }
    })
  }

}
