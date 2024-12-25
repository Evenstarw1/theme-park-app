import { Component, Input } from "@angular/core";
import { ParksDTO } from "../../../Parks/models/parks.dto";

@Component({
    selector: "app-cards",
    templateUrl: "./cards.component.html",
    styleUrls: ["./cards.component.scss"],
})
export class CardsComponent {
    @Input() park!: ParksDTO;
}
