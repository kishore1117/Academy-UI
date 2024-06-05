import { NgModule } from "@angular/core";
import { HeaderComponent } from "../pages/session-page/components/header/header.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material-module";
import { AuthService } from "./service/auth.service";


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule {}
