import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { SessionPageComponent } from "./session-page.component";
import { SignupComponent } from "./pages/signup/signup.component";


const router: Routes =[
    {
        path:'',
        component: SessionPageComponent,
        children:[
            {
                path:'login',
                component:LoginComponent
            },
            {
                path:'signup',
                component:SignupComponent
            },
            {
                path:'**',
                redirectTo:'login'
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(router)],
    exports:[RouterModule]
})

export class SessionRoutingModule {}