import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../app/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  postToken() {
    this.authenticationService.token("frezze", "fr3ZZ&l0g").subscribe((res) => {
      localStorage.setItem("token", res.token);
    });
  }
}
