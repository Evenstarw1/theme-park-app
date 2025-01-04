import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { CategoryDTO } from "src/app/Shared/Models/categories.dto";
import { CategoriesService } from "src/app/Shared/Services/categories.service";
import { CustomValidators } from "../../../Shared/custom-validators";
import * as UserAction from "../../actions";
import { UserDTO } from "../../models/user.dto";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerUser: UserDTO;
    formSubmitted = false;

    name: FormControl;
    birth_date: FormControl;
    email: FormControl;
    confirmEmail: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    city: FormControl;
    profile_picture: FormControl;
    description: FormControl;

    registerForm: FormGroup;
    isValidForm: boolean | null;
    profilePicture: string | ArrayBuffer | null = null;

    categories = new FormControl<number[]>([]);
    categoryList: CategoryDTO[] = [];

    hidePassword = true;
    hideConfirmPassword = true;

    get categoriesDisplayText(): string {
        const selectedCategoryIds = this.categories.value || [];
        if (!this.categoryList || this.categoryList.length === 0) {
            return "No categories available";
        }
        const selectedCategoryNames = this.categoryList
            .filter((category) => selectedCategoryIds.includes(category.id))
            .map((category) => category.name);

        if (selectedCategoryNames.length === 0) {
            return "No categories selected";
        }
        return selectedCategoryNames.join(", ");
    }

    constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private categoriesService: CategoriesService) {
        this.registerUser = new UserDTO("", "", "", "", "", "", "", [], 2);

        this.isValidForm = null;

        this.name = new FormControl(this.registerUser.name, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]);

        this.birth_date = new FormControl(this.registerUser.birth_date ? formatDate(this.registerUser.birth_date, "yyyy-MM-dd", "en") : null, [
            Validators.required,
        ]);

        this.email = new FormControl(this.registerUser.email, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]);
        this.confirmEmail = new FormControl("", [Validators.required]);

        this.password = new FormControl(this.registerUser.password, [Validators.required, Validators.minLength(8)]);
        this.confirmPassword = new FormControl("", [Validators.required]);

        this.city = new FormControl(this.registerUser.city);

        this.profile_picture = new FormControl(null);

        this.description = new FormControl(null);

        this.registerForm = this.formBuilder.group(
            {
                name: this.name,
                birth_date: this.birth_date,
                email: this.email,
                confirmEmail: this.confirmEmail,
                password: this.password,
                confirmPassword: this.confirmPassword,
                city: this.city,
                profile_picture: this.profile_picture,
                description: this.description,
                categories: this.categories,
            },
            {
                validators: [
                    CustomValidators.match("password", "confirmPassword", "password-mismatch"),
                    CustomValidators.match("email", "confirmEmail", "email-mismatch"),
                ],
            }
        );
    }

    ngOnInit(): void {
        this.categoriesService.getCategories().subscribe(
            (categories) => {
                this.categoryList = categories;
            },
            (err) => {
                console.error("Error fetching categories:", err);
            }
        );
    }

    register(): void {
        this.isValidForm = false;
        this.formSubmitted = true;

        // if (this.registerForm.invalid) {
        //   return;
        // }

        this.isValidForm = true;
        this.registerUser = this.registerForm.value;

        let formattedBirthDate: string | null = null;
        if (this.registerUser.birth_date) {
            const parsedDate = new Date(this.registerUser.birth_date);
            if (!isNaN(parsedDate.getTime())) {
                formattedBirthDate = parsedDate.toISOString();
            } else {
                console.error("Invalid date value for birth_date:", this.registerUser.birth_date);
            }
        }

        const selectedCategoryIds = this.registerForm.get("categories")?.value || [];

        const user: UserDTO = {
            name: this.registerUser.name,
            birth_date: formattedBirthDate || "",
            email: this.registerUser.email,
            password: this.registerUser.password,
            city: this.registerUser.city,
            profile_picture: this.registerForm.value.profile_picture,
            description: this.registerUser.description,
            categories: selectedCategoryIds,
            access_level: 2,
        };

        this.store.dispatch(UserAction.register({ user }));
    }
}
