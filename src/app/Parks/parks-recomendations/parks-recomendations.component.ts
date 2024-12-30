import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store, createSelector } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { AppState } from "src/app/app.reducers"; // <-- el mismo AppState que en ProfileComponent
import * as ParksActions from "../actions";
import { ParkDetailDTO, ParksDTO } from "../models/parks.dto";
import { ParksState } from "../reducers/parks.reducer";

// Selector que apunta a parksState dentro de AppState
export const selectParksFeature = (state: AppState) => state.parks;

// Selector que devuelve los details guardados en parksState.parkDetails
export const selectAllParkDetails = createSelector(selectParksFeature, (parksState: ParksState) => parksState.parkDetails);

@Component({
    selector: "app-parks-recomendations",
    templateUrl: "./parks-recomendations.component.html",
    styleUrls: ["./parks-recomendations.component.scss"],
})
export class ParksRecomendationsComponent implements OnInit {
    // En ProfileComponent usas "userCategories: number[]",
    // aquí lo recibimos como userCategoryIds.
    @Input() userCategoryIds: number[] = [];

    recommendedParks: ParkDetailDTO[] = [];

    // Observable de la lista básica de parques
    parks$: Observable<ParksDTO[]>;
    private userId: string;

    constructor(
        private store: Store<AppState>, // <-- Igual que en ProfileComponent
        private router: Router
    ) {
        // Nos suscribimos a la parte "parks" del store global
        this.parks$ = this.store.select((state) => state.parks.parks);
        this.userId = "";

        // Si quieres usar auth, te suscribes a "auth" de la misma forma:
        this.store.select("auth").subscribe((auth) => {
            if (auth.credentials.user_id) {
                this.userId = auth.credentials.user_id;
            }
        });
    }

    ngOnInit(): void {
        // 1) Disparamos la acción para obtener la lista básica de parques
        if (this.userId) {
            this.store.dispatch(ParksActions.getParksList());

            // 2) Cuando tengamos la lista, para cada parque se pide su detalle
            this.parks$.pipe(take(1)).subscribe((parksList) => {
                parksList.forEach((park: ParksDTO) => {
                    this.store.dispatch(ParksActions.getParkDetail({ parkId: park.id }));
                });
            });

            // 3) Nos suscribimos a todos los detalles de parque que se vayan guardando en el store
            this.store.select(selectAllParkDetails).subscribe((allDetails: ParkDetailDTO[]) => {
                // Filtramos los parques que contengan las categorías ID del usuario
                this.recommendedParks = allDetails.filter((detail) => detail.categories.some((cat) => this.userCategoryIds.includes(cat.id)));
            });
        }
    }
}
