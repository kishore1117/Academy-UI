import { NgModule } from "@angular/core";
import { AcademyComponent } from "./academy.component";
import { AcdemyRoutingModule } from "./acdemy-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "src/app/shared/shared.module";
import { LocationComponent } from './pages/location/location.component';
import { StudentModelComponent } from './components/student-model/student-model.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from './pages/admin/admin.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'environment/environment';
import {AngularFireModule} from '@angular/fire/compat'
import { InputTextModule } from 'primeng/inputtext';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AdminModule } from "./pages/admin/admin.module";
import { UserService } from "./service/user.service";
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview'; 
import { TagModule } from 'primeng/tag';  
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu'; 
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';



@NgModule({
    declarations:[
        AcademyComponent,
        DashboardComponent,
        LocationComponent,
        StudentModelComponent,
        ProfilePageComponent
    ],
    providers:[UserService],
    imports:[
        AdminModule,
        DialogModule,
        TagModule,
        TabViewModule,
        MenuModule,
        TableModule,
        SplitButtonModule,
        AcdemyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AvatarModule,
        AvatarGroupModule,
        CardModule,
        ButtonModule,
        FileUploadModule,
        InputTextModule,
        FloatLabelModule,
        DropdownModule,
        RadioButtonModule,
        ToastModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
        AngularFireModule.initializeApp(environment),
        AngularFireStorageModule,
        
    ]
})

export class AcdemyModule {}