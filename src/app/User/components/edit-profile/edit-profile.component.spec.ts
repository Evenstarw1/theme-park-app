import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { CategoriesService } from "src/app/Shared/Services/categories.service";
import * as UserAction from "../../actions";
import { UserDTO } from "../../models/user.dto";
import { EditProfileComponent } from "./edit-profile.component";

class MockCategoriesService {
    getCategories() {
        return of([
            { id: 1, name: "Category 1" },
            { id: 2, name: "Category 2" },
        ]);
    }
}

describe("EditProfileComponent", () => {
    let component: EditProfileComponent;
    let fixture: ComponentFixture<EditProfileComponent>;
    let store: MockStore;
    let categoriesService: MockCategoriesService;

    const initialState = {
        auth: { credentials: { user_id: "123" } },
        user: {
            user: { id: "123", name: "John Doe", categories: [1, 2], birth_date: "1991-01-01", city: "City", profile_picture: "", description: "" },
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, StoreModule.forRoot({})],
            declarations: [EditProfileComponent],
            providers: [provideMockStore({ initialState }), { provide: CategoriesService, useClass: MockCategoriesService }],
        }).compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        categoriesService = TestBed.inject(CategoriesService);

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize the form with user data", () => {
        const user = initialState.user.user;
        expect(component.editProfileForm.value.name).toBe(user.name);
        expect(component.editProfileForm.value.birth_date).toBe(user.birth_date);
        expect(component.editProfileForm.value.city).toBe(user.city);
        expect(component.editProfileForm.value.profile_picture).toBe(user.profile_picture);
        expect(component.editProfileForm.value.description).toBe(user.description);
        expect(component.editProfileForm.value.categories).toEqual(user.categories);
    });

    it("should load categories from the CategoriesService", () => {
        spyOn(categoriesService, "getCategories").and.callThrough();

        component.loadCategories();

        expect(categoriesService.getCategories).toHaveBeenCalled();
        expect(component.categoryList.length).toBe(2);
    });

    it("should call the store dispatch when editProfile is called", () => {
        const dispatchSpy = spyOn(store, "dispatch");
        component.editProfileForm.setValue({
            name: "John Doe Updated",
            birth_date: "1992-01-01",
            city: "New City",
            profile_picture: "new_picture_url",
            description: "Updated description",
            categories: [1],
        });

        component.editProfile();

        const expectedUser: UserDTO = {
            id: "123",
            name: "John Doe Updated",
            birth_date: "1992-01-01T00:00:00.000Z",
            email: "",
            password: "",
            city: "New City",
            profile_picture: "new_picture_url",
            description: "Updated description",
            categories: [1],
            access_level: 2,
        };

        expect(dispatchSpy).toHaveBeenCalledWith(UserAction.updateUser({ userId: "123", user: expectedUser }));
    });
});
