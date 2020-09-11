import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { TextMaskModule } from "angular2-text-mask";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { UsersComponent } from "./components/users/users.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrdersControlComponent } from "./components/adm/orders-control/orders-control.component";
import { HomeComponent } from "./components/home/home.component";
import { DeliveryComponent } from "./components/delivery/delivery.component";
import { ResumeComponent } from "./components/resume/resume.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./components/adm/login/login.component";
import { NavBarAdmComponent } from "./components/adm/nav-bar-adm/nav-bar-adm.component";
import { UsersQueryComponent } from "./components/adm/users-query/users-query.component";
import { UsersDataComponent } from './components/adm/users-query/users-data/users-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UsersComponent,
    OrdersComponent,
    OrdersControlComponent,
    HomeComponent,
    DeliveryComponent,
    ResumeComponent,
    LoginComponent,
    NavBarAdmComponent,
    UsersQueryComponent,
    UsersDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setLocale("pt-BR"),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "pt-BR" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
