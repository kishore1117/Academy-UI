import { Component } from '@angular/core';
import { FileUploadEvent } from 'primeng/fileupload';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { selectCurrentUser } from 'src/app/shared/store/selectors/current-user.selector';
import { UserService } from '../../service/user.service';
import { subscribe } from 'diagnostics_channel';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  user$: any;
  url:string;
  path:string;
  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private fireStorage: AngularFireStorage,
    private usersService:UserService
  ){
    this.store.select(selectCurrentUser).subscribe((item)=>{
      this.user$ = item
    }); 
   
  }
  async onUpload($event:FileUploadEvent){
    const file =  $event.files[0];
    if(file){
      this.path = `users/${this.user$?.name}-${file.name}`;
      const uploadFile = await  this.fireStorage.upload(this.path,file)
      this.getImage(this.path)
    }    
  }
 
  getImage(path:string){
    this.fireStorage.ref(path).getDownloadURL().subscribe((item)=>{
      this.url = item;
                const data = {
        "picture":this.url
      }
           this.usersService.updateUser(data,this.user$.id).subscribe((res)=>{
        this.toastr.success('Profile Picture updated successfully')
      })
    })
  }
}
