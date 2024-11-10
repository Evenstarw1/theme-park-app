import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
//import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMatFileInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class UserModule {}
