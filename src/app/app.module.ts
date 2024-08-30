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
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"academy-39222","appId":"1:833028477884:web:845d81977fd1b2183851b9","storageBucket":"academy-39222.appspot.com","apiKey":"AIzaSyD9anb2HVFjgWlPP53YVop9Ubn_ShxTdEw","authDomain":"academy-39222.firebaseapp.com","messagingSenderId":"833028477884","measurementId":"G-5KXYBCCMDJ"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
