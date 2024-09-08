import { Component } from '@angular/core';
import {  locationResponse } from "../../academy-models/academy.module";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {  reset } from '../../../../shared/store/actions/counter.action';
import { selectCurrentUser, selectUserError, selectUserLoading } from 'src/app/shared/store/selectors/current-user.selector';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  user$: Observable<any | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.select(selectCurrentUser).subscribe((item)=>{
      this.location = item?.location
      this.isLoading=false
    });  
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }
  location: locationResponse[]
  isLoading: boolean = true;
  
  navigate(id:number){
    this.router.navigate([`academy/location`,id]);
  }
  ngdestroy(){
    this.store.dispatch(reset())
  }
}
