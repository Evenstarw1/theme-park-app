import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminCategoriesComponent } from "./components/admin-categories/admin-categories.component";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { AdminParksComponent } from "./components/admin-parks/admin-parks.component";
import { ParkFormComponent } from "./components/park-form/park-form.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

@NgModule({
    declarations: [AdminHomeComponent, AdminCategoriesComponent, AdminParksComponent, UsersListComponent, ParkFormComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
})
export class AdminModule {}
