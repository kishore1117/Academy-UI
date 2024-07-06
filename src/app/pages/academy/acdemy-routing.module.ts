import { RouterModule, Routes } from "@angular/router";
import { AcademyComponent } from "./academy.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LocationComponent } from "./pages/location/location.component";




const routes: Routes = [
    {
        path:'',
        component:AcademyComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'location/:id',
                component:LocationComponent
            }
        ]
    }
]


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports:[RouterModule]
})


export class AcdemyRoutingModule {}