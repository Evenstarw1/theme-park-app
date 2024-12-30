import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

@NgModule({
    imports: [CommonModule, MatExpansionModule],
    exports: [MatExpansionModule, GoogleMapsModule, MatCardModule, MatListModule],
})
export class SharedModule {}
