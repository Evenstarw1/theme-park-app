import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParksDetailComponent } from "./parks-detail/parks-detail.component";
import { ParksListComponent } from "./parks-list/parks-list.component";

const routes: Routes = [
    {
        path: "list",
        component: ParksListComponent,
    },
    {
        path: "detail/:id",
        component: ParksDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ParksRoutingModule {}
