import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-home",
    templateUrl: "./admin-home.component.html",
    styleUrls: ["./admin-home.component.scss"],
})
export class AdminHomeComponent {
    constructor(private router: Router) {}
    navigateToUsersList(): void {
        this.router.navigate(["admin/users"]);
    }

    navigateToAdminParks(): void {
        this.router.navigate(["admin/parks"]);
    }

    navigateToAdminCategories(): void {
        this.router.navigate(["admin/categories"]);
    }
}
