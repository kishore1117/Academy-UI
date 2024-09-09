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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'environment/environment';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireStorage, AngularFireStorageModule } from "@angular/fire/compat/storage";

@NgModule({
    declarations:[
        AcademyComponent,
        DashboardComponent,
        LocationComponent,
        StudentModelComponent,
        AdminComponent,
        ProfilePageComponent,
    ],
    imports:[
        AcdemyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AvatarModule,
        AvatarGroupModule,
        CardModule,
        ButtonModule,
        FileUploadModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
        AngularFireModule.initializeApp(environment),
        AngularFireStorageModule
    ]
})

export class AcdemyModule {}