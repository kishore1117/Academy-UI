import { RouterModule, Routes } from "@angular/router";
import { AcademyComponent } from "./academy.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";




const routes: Routes = [
    {
        path:'',
        component:AcademyComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }
]


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports:[RouterModule]
})


export class AcdemyRoutingModule {}