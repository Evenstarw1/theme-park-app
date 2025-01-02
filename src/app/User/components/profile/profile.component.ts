import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, combineLatest } from "rxjs";
import { AppState } from "src/app/app.reducers";
import * as AuthAction from "../../../Auth/actions";
import * as ParksAction from "../../../Parks/actions";
import { ParksDTO } from "../../../Parks/models/parks.dto";
import * as UserAction from "../../actions";
import { UserDTO } from "../../models/user.dto";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    profileUser$: Observable<UserDTO | null>;
    parks$: Observable<ParksDTO[]>;
    recommendedParks: ParksDTO[] = [];
    private userId: string;

    displayedColumns: string[] = ["name", "picture", "actions"];

    constructor(private store: Store<AppState>, private router: Router) {
        this.userId = "";

        this.store.select("auth").subscribe((auth) => {
            if (auth.credentials?.user_id) {
                this.userId = auth.credentials.user_id;
            }
        });

        this.profileUser$ = this.store.select((state) => state.user.user);
        this.parks$ = this.store.select((state) => state.parks.parks);
    }

    ngOnInit(): void {
        if (this.userId) {
            this.store.dispatch(UserAction.getUserById({ userId: this.userId }));

            setTimeout(() => {
                this.store.dispatch(ParksAction.getParksList());
            }, 1000);
        }

        combineLatest([this.profileUser$, this.parks$]).subscribe(([user, parks]) => {
            if (user && user.categories) {
                const userCategoryIds = user.categories.map(String);

                this.recommendedParks = parks.filter((park) => park.categories.some((category) => userCategoryIds.includes(String(category.id))));
            }
        });
    }

    navigateToEditProfile(): void {
        this.router.navigate(["user/edit-profile"]);
    }

    logout(): void {
        this.store.dispatch(AuthAction.logout());
        this.router.navigateByUrl("home");
    }

    navigateToAdmin(): void {
        this.router.navigate(["admin/home"]);
    }
}
