import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.reducers";
import * as AuthAction from "../../../Auth/actions";
import * as UserAction from "../../actions";
import { UserDTO } from "../../models/user.dto";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    profileUser$: Observable<UserDTO | null>;
    private userId: string;

    constructor(private store: Store<AppState>, private router: Router) {
        this.userId = "";

        this.store.select("auth").subscribe((auth) => {
            if (auth.credentials?.user_id) {
                this.userId = auth.credentials.user_id;
            }
        });

        this.profileUser$ = this.store.select((state) => state.user.user);
    }

    ngOnInit(): void {
        if (this.userId) {
            this.store.dispatch(UserAction.getUserById({ userId: this.userId }));
        }
    }

    navigateToEditProfile(): void {
        this.router.navigate(["/edit-profile"]);
    }

    logout(): void {
        this.store.dispatch(AuthAction.logout());
        this.router.navigateByUrl("home");
    }
}
