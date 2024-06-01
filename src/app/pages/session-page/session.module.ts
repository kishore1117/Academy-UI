import { NgModule } from "@angular/core";
import { SessionRoutingModule } from "./session-routing.module";
import { SessionPageComponent } from "./session-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from "@angular/common";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations:[
        SessionPageComponent,
        LoginComponent,
        SignupComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports:[
        SessionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
          })
    ]
})

export class SessionModule {}