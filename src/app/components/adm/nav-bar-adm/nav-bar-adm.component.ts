import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-bar-adm",
  templateUrl: "./nav-bar-adm.component.html",
  styleUrls: ["./nav-bar-adm.component.css"],
})
export class NavBarAdmComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  exit() {
    localStorage.removeItem("userAdm");
    this.router.navigate(["login"]);
  }
}
