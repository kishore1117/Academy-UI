import { NgModule } from "@angular/core";
import { AcademyComponent } from "./academy.component";
import { AcdemyRoutingModule } from "./acdemy-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
    declarations:[
        AcademyComponent,
        DashboardComponent
    ],
    imports:[
        AcdemyRoutingModule
    ]
})

export class AcdemyModule {}