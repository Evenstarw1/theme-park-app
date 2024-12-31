import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { CategoryDTO } from "src/app/Shared/Models/categories.dto";
import { CategoriesService } from "src/app/Shared/Services/categories.service";

@Component({
    selector: "app-admin-categories",
    templateUrl: "./admin-categories.component.html",
    styleUrls: ["./admin-categories.component.scss"],
})
export class AdminCategoriesComponent implements OnInit {
    categoryList: MatTableDataSource<CategoryDTO>;
    displayedColumns: string[] = ["id", "name", "actions"];
    showCategoryForm: boolean;
    categoryForm: FormGroup;

    constructor(private router: Router, private categoriesService: CategoriesService, private formBuilder: FormBuilder) {
        this.categoryList = new MatTableDataSource<CategoryDTO>([]);
        this.showCategoryForm = false;
        this.categoryForm = this.formBuilder.group({
            name: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.categoriesService.getCategories().subscribe(
            (categories) => {
                this.categoryList.data = categories;
            },
            (err) => {
                console.error("Error fetching categories:", err);
            }
        );
    }
    createCategory(): void {
        this.showCategoryForm = true;
    }

    addCategory(): void {
        const newCategory: CategoryDTO = {
            id: 0,
            name: this.categoryForm.value.name,
        };

        this.categoriesService.addCategories(newCategory).subscribe(
            (addedCategory) => {
                console.log("Categoría añadida:", addedCategory);
                this.categoryList.data = [...this.categoryList.data, addedCategory];
                this.showCategoryForm = false;
                this.categoryForm.reset();
            },
            (err) => {
                console.error("Error al añadir la categoría:", err);
            }
        );
    }

    cancelAddCategory(): void {
        this.showCategoryForm = false;
        this.categoryForm.reset();
    }
}
