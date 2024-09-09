import { RouterModule, Routes } from "@angular/router";
import { AcademyComponent } from "./academy.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LocationComponent } from "./pages/location/location.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";




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
            },
            {
                path:'admin',
                component:AdminComponent
            },
            {
                path:'profile',
                component:ProfilePageComponent
            }
        ]
    }
]


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports:[RouterModule]
})


export class AcdemyRoutingModule {}