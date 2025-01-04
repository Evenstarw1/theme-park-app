import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppState } from "src/app/app.reducers";
import * as AuthAction from "../../../Auth/actions";
import * as UserAction from "../../actions";
import { ProfileComponent } from "./profile.component";

describe("ProfileComponent", () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let store: MockStore<AppState>;

    const initialState: Partial<AppState> = {
        auth: {
            credentials: {
                user_id: "123",
                access_token: "",
                email: "",
                password: "",
            },
            loading: false,
            loaded: false,
            error: undefined,
        },
        user: {
            user: {
                id: "123",
                categories: ["Nature"],
                name: "",
                birth_date: "",
                city: "",
                profile_picture: "",
                description: "",
                access_level: 0,
            },
            users: [],
            loading: false,
            loaded: false,
            error: undefined,
        },
        parks: {
            parks: [
                {
                    id: 1,
                    name: "National Park",
                    categories: [
                        {
                            id: 1,
                            name: "Nature",
                            created: "2023-01-01",
                        },
                    ],
                    picture: "national-park.jpg",
                },
            ],
            parkDetail: null,
            loading: false,
            loaded: false,
            error: undefined,
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [RouterTestingModule],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should dispatch getUserById on initialization", () => {
        const dispatchSpy = spyOn(store, "dispatch").and.callThrough();

        component.ngOnInit();

        expect(dispatchSpy).toHaveBeenCalledWith(UserAction.getUserById({ userId: "123" }));
    });

    it("should navigate to edit profile", () => {
        const routerSpy = spyOn(component["router"], "navigate");

        component.navigateToEditProfile();

        expect(routerSpy).toHaveBeenCalledWith(["user/edit-profile"]);
    });

    it("should dispatch logout and navigate to home", () => {
        const dispatchSpy = spyOn(store, "dispatch").and.callThrough();
        const routerSpy = spyOn(component["router"], "navigateByUrl");

        component.logout();

        expect(dispatchSpy).toHaveBeenCalledWith(AuthAction.logout());
        expect(routerSpy).toHaveBeenCalledWith("home");
    });

    it("should navigate to admin home", () => {
        const routerSpy = spyOn(component["router"], "navigate");

        component.navigateToAdmin();

        expect(routerSpy).toHaveBeenCalledWith(["admin/home"]);
    });
});
