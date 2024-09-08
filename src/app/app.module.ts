import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'environment/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './shared/store/reducers/counter.reducer';
import { userReducer } from './shared/store/reducers/current-user.reducer';
import { UserEffects } from './shared/store/effects/current-user.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:2000 ,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    StoreModule.forRoot({ user: userReducer }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([UserEffects]),
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
