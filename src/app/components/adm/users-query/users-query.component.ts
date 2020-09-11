import { UsersService } from "./../../../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-query",
  templateUrl: "./users-query.component.html",
  styleUrls: ["./users-query.component.css"],
})
export class UsersQueryComponent implements OnInit {
  users = [];
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.usersService.getClients().subscribe((res) => {
      this.users = res.data.content;
    });
  }

  viewUser(id) {
    this.router.navigate(["users-data"], { queryParams: { id: id } });
  }
}
