import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Auth/components/login/login.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { ConstructionComponent } from "./Shared/Components/construction/construction.component";

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
        path: "login",
        component: LoginComponent,
    },
    {
        path: "user",
        loadChildren: () => import("./User/user.module").then((m) => m.UserModule),
    },
    {
        path: "park",
        loadChildren: () => import("./Parks/parks.module").then((m) => m.ParksModule),
    },
    {
        path: "admin",
        loadChildren: () => import("./Admin/admin.module").then((m) => m.AdminModule),
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
