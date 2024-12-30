import { Component, OnInit } from "@angular/core";
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

    constructor(private router: Router, private categoriesService: CategoriesService) {
        this.categoryList = new MatTableDataSource<CategoryDTO>([]);
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
        //this.router.navigateByUrl("admin/park-form/");
    }
}
