import { NgModule } from "@angular/core";
import { SessionRoutingModule } from "./session-routing.module";
import { SessionPageComponent } from "./session-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations:[
        SessionPageComponent,
        LoginComponent,
        SignupComponent
    ],
    imports:[
        SessionRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SessionModule {}