import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { UserService } from '../../service/user.service';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations:[
    AdminComponent,
    UsersPageComponent,
    LocationPageComponent,
  ],
    imports:[
        AdminRoutingModule,
        FormsModule,
        CheckboxModule,
        CommonModule,
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
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
        AngularFireModule.initializeApp(environment),
        AngularFireStorageModule
    ],
    providers:[UserService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})

export class AdminModule {}