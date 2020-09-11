import { UsersDataComponent } from "./components/adm/users-query/users-data/users-data.component";
import { UsersQueryComponent } from "./components/adm/users-query/users-query.component";
import { LoginComponent } from "./components/adm/login/login.component";
import { ResumeComponent } from "./components/resume/resume.component";
import { DeliveryComponent } from "./components/delivery/delivery.component";
import { OrdersControlComponent } from "./components/adm/orders-control/orders-control.component";
import { UsersComponent } from "./components/users/users.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "users-query", component: UsersQueryComponent },
  { path: "users-data", component: UsersDataComponent },
  { path: "orders", component: OrdersComponent },
  { path: "orders-control", component: OrdersControlComponent },
  { path: "delivery", component: DeliveryComponent },
  { path: "resume", component: ResumeComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
