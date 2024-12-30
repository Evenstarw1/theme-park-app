import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as ParksActions from "src/app/Parks/actions";
import { ParkCreateUpdateDTO } from "src/app/Parks/models/parks.dto";
import { CategoryDTO } from "src/app/Shared/Models/categories.dto";
import { CategoriesService } from "src/app/Shared/Services/categories.service";

@Component({
    selector: "app-park-form",
    templateUrl: "./park-form.component.html",
    styleUrls: ["./park-form.component.scss"],
})
export class ParkFormComponent implements OnInit {
    registerPark: ParkCreateUpdateDTO;
    private parkId: string;
    private isUpdateMode: boolean;

    formSubmitted = false;
    isValidForm: boolean | null = null;

    name: FormControl;
    description: FormControl;
    picture: FormControl;
    latitude: FormControl;
    longitude: FormControl;
    categories = new FormControl<number[]>([]);

    parkForm: FormGroup;

    categoryList: CategoryDTO[] = [];

    get categoriesDisplayText(): string {
        const selectedCategoryIds = this.categories.value || [];
        const selectedCategoryNames = this.categoryList.filter((cat) => selectedCategoryIds.includes(cat.id)).map((cat) => cat.name);

        if (selectedCategoryNames.length === 0) return "No categories selected";
        return selectedCategoryNames.join(", ");
    }

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService
    ) {
        this.registerPark = {
            id: 0,
            name: "",
            description: "",
            picture: "",
            latitude: 0,
            longitude: 0,
            categories: [],
        };

        this.parkId = "";
        this.isUpdateMode = false;

        this.name = new FormControl(this.registerPark.name, [Validators.required]);

        this.description = new FormControl(this.registerPark.description);

        this.picture = new FormControl(this.registerPark.picture);

        this.latitude = new FormControl(this.registerPark.latitude, [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d+)?$")]);

        this.longitude = new FormControl(this.registerPark.longitude, [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d+)?$")]);

        this.categories = new FormControl<number[]>([]);

        this.parkForm = this.formBuilder.group({
            name: this.name,
            description: this.description,
            picture: this.picture,
            latitude: this.latitude,
            longitude: this.longitude,
            categories: this.categories,
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.parkId = params.get("id") || "";
            if (this.parkId) {
                this.isUpdateMode = true;
                this.store.dispatch(ParksActions.getParkDetail({ parkId: this.parkId }));
            }
        });
        this.categoriesService.getCategories().subscribe(
            (categories) => {
                this.categoryList = categories;
            },
            (err) => {
                console.error("Error fetching categories:", err);
            }
        );
        this.store
            .select((state: any) => state.parks.parkDetail)
            .subscribe((park) => {
                if (park) {
                    this.parkForm.patchValue({
                        name: park.name,
                        description: park.description,
                        picture: park.picture,
                        latitude: park.latitude,
                        longitude: park.longitude,
                        categories: park.categories,
                    });
                    this.parkId = park.id;
                }
            });
    }

    savePark(): void {
        this.isValidForm = false;
        this.formSubmitted = true;

        if (this.parkForm.invalid) {
            this.parkForm.markAllAsTouched();
            return;
        }

        this.isValidForm = true;

        this.registerPark = this.parkForm.value;

        const selectedCategoryIds = this.parkForm.get("categories")?.value || [];

        const park: ParkCreateUpdateDTO = {
            id: this.parkId ? parseInt(this.parkId, 10) : undefined,
            name: this.parkForm.value.name,
            description: this.parkForm.value.description,
            picture: this.parkForm.value.picture,
            latitude: parseFloat(this.parkForm.value.latitude),
            longitude: parseFloat(this.parkForm.value.longitude),
            categories: selectedCategoryIds.map((id: number) => ({ id })),
        };

        if (this.isUpdateMode) {
            this.updatePark(park);
        } else {
            this.createPark(park);
        }
    }
    createPark(park: ParkCreateUpdateDTO): void {
        this.store.dispatch(ParksActions.addPark({ park }));
    }

    updatePark(park: ParkCreateUpdateDTO): void {
        this.store.dispatch(ParksActions.updatePark({ parkId: this.parkId, park }));
    }
}
