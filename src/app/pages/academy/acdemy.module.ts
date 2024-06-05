import { NgModule } from "@angular/core";
import { AcademyComponent } from "./academy.component";
import { AcdemyRoutingModule } from "./acdemy-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
    declarations:[
        AcademyComponent,
        DashboardComponent
    ],
    imports:[
        AcdemyRoutingModule,
        SharedModule
    ]
})

export class AcdemyModule {}