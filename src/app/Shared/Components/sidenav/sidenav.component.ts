import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducers";
import * as AuthAction from "src/app/Auth/actions";
import { SidenavService } from "src/app/Shared/Services/sidenav.service";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() sidenavOpen: boolean = false;
    sidenavType: "menu" | "account" | null = null;
    showAuthSection: boolean = false;
    showNoAuthSection: boolean = true;

    private sidenavTypeSubscription!: Subscription;
    private sidenavOpenSubscription!: Subscription;
    private authSubscription!: Subscription;

    @ViewChild("sidenav") sidenav!: MatSidenav;

    constructor(private router: Router, private sidenavService: SidenavService, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.sidenavTypeSubscription = this.sidenavService.sidenavType$.subscribe((type: "menu" | "account" | null) => {
            this.sidenavType = type;
        });

        this.authSubscription = this.store.select("auth").subscribe((auth) => {
            this.showAuthSection = !!auth.credentials?.access_token;
            this.showNoAuthSection = !this.showAuthSection;
        });
    }

    ngAfterViewInit(): void {
        this.sidenavOpenSubscription = this.sidenavService.sidenavOpen$.subscribe((isOpen) => {
            if (this.sidenav) {
                if (isOpen) {
                    this.sidenav.open();
                } else {
                    this.sidenav.close();
                }
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sidenavTypeSubscription) {
            this.sidenavTypeSubscription.unsubscribe();
        }
        if (this.sidenavOpenSubscription) {
            this.sidenavOpenSubscription.unsubscribe();
        }
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    // Account navigation
    login(): void {
        this.router.navigateByUrl("login");
        this.sidenavService.closeSidenav();
    }

    register(): void {
        this.router.navigateByUrl("register");
        this.sidenavService.closeSidenav();
    }

    profile(): void {
        this.router.navigateByUrl("profile");
        this.sidenavService.closeSidenav();
    }

    logout(): void {
        this.store.dispatch(AuthAction.logout());
        this.router.navigateByUrl("home");
        this.sidenavService.closeSidenav();
    }

    // Menu navigation
    home(): void {
        this.router.navigateByUrl("home");
        this.sidenavService.closeSidenav();
    }

    parksList(): void {
        this.router.navigateByUrl("park-list");
        this.sidenavService.closeSidenav();
    }

    contact(): void {
        this.router.navigateByUrl("contact");
        this.sidenavService.closeSidenav();
    }
}
