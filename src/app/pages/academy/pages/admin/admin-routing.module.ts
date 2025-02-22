import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { UsersPageComponent } from "./pages/users-page/users-page.component";




const routes: Routes = [
    {
        path:'',
        component:AdminComponent,
        children:[
            {
                path:'users',
                component:UsersPageComponent
            }
        ]
    }
]


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports:[RouterModule]
})


export class AdminRoutingModule {}