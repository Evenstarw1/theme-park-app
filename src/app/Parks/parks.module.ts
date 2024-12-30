import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { CardsComponent } from "../Shared/Components/cards/cards.component";
import { SharedModule } from "../Shared/shared.module";
import { ParksDetailComponent } from "./parks-detail/parks-detail.component";
import { ParksListComponent } from "./parks-list/parks-list.component";
import { ParksRoutingModule } from "./parks-routing.module";

@NgModule({
    declarations: [ParksListComponent, ParksDetailComponent, CardsComponent],
    imports: [CommonModule, ParksRoutingModule, SharedModule, MatButtonModule],
})
export class ParksModule {}
