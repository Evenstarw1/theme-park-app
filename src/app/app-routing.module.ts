import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Auth/components/login/login.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { ParksDetailComponent } from "./Parks/parks-detail/parks-detail.component";
import { ParksListComponent } from "./Parks/parks-list/parks-list.component";
import { ConstructionComponent } from "./Shared/Components/construction/construction.component";
import { AuthGuard } from "./Shared/Guards/auth.guard";
import { EditProfileComponent } from "./User/components/edit-profile/edit-profile.component";
import { ProfileComponent } from "./User/components/profile/profile.component";
import { RegisterComponent } from "./User/components/register/register.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
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
        path: "park-list",
        component: ParksListComponent,
    },
    {
        path: "park-detail/:id",
        component: ParksDetailComponent,
    },
    {
        path: "construction",
        component: ConstructionComponent,
    },
    {
        path: "contact",
        component: ContactComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
