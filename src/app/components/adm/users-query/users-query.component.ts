import { UsersService } from "./../../../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { dataTabeOptions } from "src/app/utils/datatable-options";
import * as $ from "jquery";
import "datatables.net";

@Component({
  selector: "app-users-query",
  templateUrl: "./users-query.component.html",
  styleUrls: ["./users-query.component.css"],
})
export class UsersQueryComponent implements OnInit {
  public tabela: any;
  users = [];
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.initDatatable();
    this.getClients();
  }

  private initDatatable(): void {
    const tabela: any = $("#tableOrders");
    this.tabela = tabela.DataTable(dataTabeOptions);
  }

  private reInitDatatable(): void {
    if (this.tabela) {
      this.tabela.destroy();
      this.tabela = null;
    }
    setTimeout(() => this.initDatatable(), 0);
  }

  getClients() {
    this.usersService.getClients().subscribe((res) => {
      this.users = res.data.content;
      this.reInitDatatable();
    });
  }

  viewUser(id) {
    this.router.navigate(["users-data"], { queryParams: { id: id } });
  }
}
