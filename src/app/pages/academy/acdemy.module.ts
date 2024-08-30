import { NgModule } from "@angular/core";
import { AcademyComponent } from "./academy.component";
import { AcdemyRoutingModule } from "./acdemy-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "src/app/shared/shared.module";
import { LocationComponent } from './pages/location/location.component';
import { StudentModelComponent } from './components/student-model/student-model.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from './pages/admin/admin.component';


@NgModule({
    declarations:[
        AcademyComponent,
        DashboardComponent,
        LocationComponent,
        StudentModelComponent,
        AdminComponent,
    ],
    imports:[
        AcdemyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})

export class AcdemyModule {}