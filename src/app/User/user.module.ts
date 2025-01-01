import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
    declarations: [RegisterComponent, ProfileComponent, EditProfileComponent],
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
        UserRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
    ],
})
export class UserModule {}
