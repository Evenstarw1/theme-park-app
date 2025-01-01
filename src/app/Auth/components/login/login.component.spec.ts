import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { Store, StoreModule } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as AuthAction from "../../actions";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let store: jasmine.SpyObj<Store<AppState>>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        store = jasmine.createSpyObj("Store", ["dispatch"]);
        router = jasmine.createSpyObj("Router", ["navigateByUrl"]);

        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                NoopAnimationsModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                { provide: Store, useValue: store },
                { provide: Router, useValue: router },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should create the login form", () => {
        expect(component.loginForm).toBeTruthy();
        expect(component.loginForm.contains("email")).toBeTrue();
        expect(component.loginForm.contains("password")).toBeTrue();
    });

    it("should make the form invalid if email or password are empty", () => {
        component.email.setValue("");
        component.password.setValue("");
        expect(component.loginForm.valid).toBeFalse();
    });

    it("should make the form valid if email and password are correctly filled", () => {
        component.email.setValue("test@example.com");
        component.password.setValue("password123");
        expect(component.loginForm.valid).toBeTrue();
    });

    it("should dispatch the login action when login is called", () => {
        const credentials = {
            email: "test@example.com",
            password: "password123",
            user_id: "",
            access_token: "",
        };
        component.email.setValue("test@example.com");
        component.password.setValue("password123");

        component.login();

        expect(store.dispatch).toHaveBeenCalledWith(AuthAction.login({ credentials }));
    });

    it("should navigate to the register page when register is called", () => {
        component.register();
        expect(router.navigateByUrl).toHaveBeenCalledWith("user/register");
    });
});
