import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { EffectsArray, appReducers } from "./app.reducers";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./Auth/auth.module";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { ParksDetailComponent } from "./Parks/parks-detail/parks-detail.component";
import { ParksListComponent } from "./Parks/parks-list/parks-list.component";
import { CardsComponent } from "./Shared/Components/cards/cards.component";
import { ConstructionComponent } from "./Shared/Components/construction/construction.component";
import { FooterComponent } from "./Shared/Components/footer/footer.component";
import { HeaderComponent } from "./Shared/Components/header/header.component";
import { SidenavComponent } from "./Shared/Components/sidenav/sidenav.component";
import { AuthInterceptorService } from "./Shared/Services/auth-interceptor.service";
import { LoadingInterceptor } from "./Shared/Services/loading.interceptor";
import { UserModule } from "./User/user.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        HomeComponent,
        ConstructionComponent,
        ContactComponent,
        ParksListComponent,
        ParksDetailComponent,
        CardsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        UserModule,
        AuthModule,
        FormsModule,
        StoreModule.forRoot(appReducers, {
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false,
            },
        }),
        EffectsModule.forRoot(EffectsArray),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
