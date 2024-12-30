import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { Category } from "src/app/Shared/Models/categories.dto";
import { CategoriesService } from "src/app/Shared/Services/categories.service";
import * as UserAction from "../../actions";
import { UserDTO } from "../../models/user.dto";

@Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
    registerUser: UserDTO;
    private userId: string;
    formSubmitted = false;

    name: FormControl;
    birth_date: FormControl;
    city: FormControl;
    profile_picture: FormControl;
    description: FormControl;

    editProfileForm: FormGroup;
    isValidForm: boolean | null;
    profilePicture: string | ArrayBuffer | null = null;

    categories = new FormControl<number[]>([]);
    categoryList: Category[] = [];

    get categoriesDisplayText(): string {
        const selectedCategoryIds = this.categories.value || [];
        const selectedCategoryNames = this.categoryList
            .filter((category) => selectedCategoryIds.includes(category.id))
            .map((category) => category.name);

        if (selectedCategoryNames.length === 0) return "No categories selected";
        return selectedCategoryNames.join(", ");
    }

    constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private categoriesService: CategoriesService) {
        this.registerUser = new UserDTO("", "", "", "", "", "", "", []);
        this.userId = "";
        this.isValidForm = null;

        this.name = new FormControl(this.registerUser.name, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]);

        this.birth_date = new FormControl(this.registerUser.birth_date ? formatDate(this.registerUser.birth_date, "yyyy-MM-dd", "en") : null, [
            Validators.required,
        ]);

        this.city = new FormControl(this.registerUser.city);

        this.profile_picture = new FormControl(null);

        this.description = new FormControl(null);

        this.editProfileForm = this.formBuilder.group({
            name: this.name,
            birth_date: this.birth_date,
            city: this.city,
            profile_picture: this.profile_picture,
            description: this.description,
            categories: this.categories,
        });

        this.store.select("auth").subscribe((auth) => {
            if (auth.credentials?.user_id) {
                this.userId = auth.credentials.user_id;
            }
        });
    }

    ngOnInit(): void {
        if (this.userId) {
            this.categoriesService.getCategories().subscribe(
                (categories) => {
                    this.categoryList = categories;
                },
                (err) => {
                    console.error("Error fetching categories:", err);
                }
            );
            this.store.dispatch(UserAction.getUserById({ userId: this.userId }));

            this.store
                .select((state) => state.user.user)
                .subscribe((user) => {
                    if (user) {
                        this.editProfileForm.patchValue({
                            name: user.name,
                            birth_date: formatDate(user.birth_date, "yyyy-MM-dd", "en"),
                            city: user.city,
                            profile_picture: user.profile_picture,
                            description: user.description,
                            categories: user.categories,
                        });
                    }
                });
        }
    }

    editProfile(): void {
        this.isValidForm = false;
        this.formSubmitted = true;

        // if (this.editProfileForm.invalid) {
        //   return;
        // }

        this.isValidForm = true;
        this.registerUser = this.editProfileForm.value;

        let formattedBirthDate: string | null = null;
        if (this.registerUser.birth_date) {
            const parsedDate = new Date(this.registerUser.birth_date);
            if (!isNaN(parsedDate.getTime())) {
                formattedBirthDate = parsedDate.toISOString();
            } else {
                console.error("Invalid date value for birth_date:", this.registerUser.birth_date);
            }
        }

        const selectedCategoryIds = this.editProfileForm.get("categories")?.value || [];

        const user: UserDTO = {
            id: this.userId,
            name: this.registerUser.name,
            birth_date: formattedBirthDate || "",
            email: "",
            password: "",
            city: this.registerUser.city,
            profile_picture: this.editProfileForm.value.profile_picture,
            description: this.registerUser.description,
            categories: selectedCategoryIds,
        };

        this.store.dispatch(UserAction.updateUser({ userId: this.userId, user }));
    }
}
