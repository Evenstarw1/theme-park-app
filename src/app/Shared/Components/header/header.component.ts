import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { SidenavService } from "src/app/Shared/Services/sidenav.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    @Output() sidenavToggle = new EventEmitter<void>();
    searchQuery: string = "";
    isAuthenticated: boolean = false;

    constructor(private router: Router, private sidenavService: SidenavService, private store: Store<AppState>) {
        this.store.select("auth").subscribe((auth) => {
            this.isAuthenticated = !!auth.credentials?.access_token;
        });
    }

    dashboard(): void {
        this.router.navigateByUrl("home");
    }

    parksList(): void {
        if (this.isAuthenticated) {
            this.router.navigateByUrl("park/list");
        } else {
            this.router.navigateByUrl("login");
        }
    }

    contact(): void {
        this.router.navigateByUrl("contact");
    }

    openSidenav(type: "menu" | "account"): void {
        this.sidenavService.toggleSidenav(type);
    }

    // Añadir la lógica de búsqueda cuando esté implementado la parte de parques
    // performSearch(): void {
    //   console.log('Performing search for:', this.searchQuery);
    //
    // }

    onSearch(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.searchQuery = input.value;
        console.log("Search query:", this.searchQuery);
    }
}
