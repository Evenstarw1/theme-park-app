import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminCategoriesComponent } from "./components/admin-categories/admin-categories.component";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { AdminParksComponent } from "./components/admin-parks/admin-parks.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

@NgModule({
    declarations: [AdminHomeComponent, AdminCategoriesComponent, AdminParksComponent, UsersListComponent],
    imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
