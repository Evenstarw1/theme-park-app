import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../Shared/Guards/admin.guard";
import { AdminCategoriesComponent } from "./components/admin-categories/admin-categories.component";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { AdminParksComponent } from "./components/admin-parks/admin-parks.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

const routes: Routes = [
    {
        path: "home",
        component: AdminHomeComponent,
        canActivate: [AdminGuard],
    },
    {
        path: "users",
        component: UsersListComponent,
        canActivate: [AdminGuard],
    },
    {
        path: "parks",
        component: AdminParksComponent,
        canActivate: [AdminGuard],
    },
    {
        path: "categories",
        component: AdminCategoriesComponent,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
