import { NgModule } from "@angular/core";
import { HeaderComponent } from "../pages/session-page/components/header/header.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material-module";
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmationModelComponent } from './components/confirmation-model/confirmation-model.component';


@NgModule({
  declarations: [HeaderComponent, LoaderComponent, ConfirmationModelComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule,
    LoaderComponent,
    ConfirmationModelComponent 
  ]
})
export class SharedModule {}
