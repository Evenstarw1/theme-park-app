import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.reducers";
import * as UserActions from "src/app/User/actions";
import { UserDTO } from "src/app/User/models/user.dto";

@Component({
    selector: "app-users-list",
    templateUrl: "./users-list.component.html",
    styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
    users$: Observable<UserDTO[]>;

    constructor(private store: Store<AppState>, private router: Router) {
        this.users$ = this.store.select((state) => state.user.users);
    }

    ngOnInit(): void {
        this.store.dispatch(UserActions.getAllUsers());
    }

    backToAdmin(): void {
        this.router.navigate(["admin/home"]);
    }
}
