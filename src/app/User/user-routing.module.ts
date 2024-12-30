import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../Shared/Guards/auth.guard";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "edit-profile",
        component: EditProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "register",
        component: RegisterComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
