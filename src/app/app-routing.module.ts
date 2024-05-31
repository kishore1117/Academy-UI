import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes:Routes =[
    {
        path:'session',
        loadChildren:()=> import('./pages/session-page/session.module').then((m)=> m.SessionModule)
    },
    {
        path:'academy',
        loadChildren:()=> import('./pages/academy/acdemy.module').then((m)=>m.AcdemyModule)
    },
    {
        path:'',
        pathMatch:'full',
        redirectTo:'session',
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}