import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './User/components/register/register.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { ProfileComponent } from './User/components/profile/profile.component';
import { EditProfileComponent } from './User/components/edit-profile/edit-profile.component';
import { ConstructionComponent } from './Shared/Components/construction/construction.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ParksListComponent } from './Parks/parks-list/parks-list.component'; 
import { AuthGuard } from './Shared/Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'park-list',
    component: ParksListComponent
  },
  {
    path: 'construction',
    component: ConstructionComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
