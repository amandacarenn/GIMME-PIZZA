import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../../app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    if (
      this.loginForm.controls.user.value === "frezze" &&
      this.loginForm.controls.password.value === "fr3ZZ&l0g"
    ) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logando",
        showConfirmButton: false,
        timer: 1500,
      }).then((res) => {
        this.postToken();
        const userAdm = {
          user: this.loginForm.controls.user.value,
          password: this.loginForm.controls.password.value,
        };
        localStorage.setItem("userAdm", JSON.stringify(userAdm));
        this.router.navigate(["orders-control"]);
      });
    } else {
      Swal.fire(
        "Opss...",
        "Usuário e/ou senha incorreta",
        "error"
      ).then((res) => {});
    }
  }

  postToken() {
    this.authenticationService.token("frezze", "fr3ZZ&l0g").subscribe((res) => {
      localStorage.setItem("token", res.token);
    });
  }
}
