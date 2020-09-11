import { UsersService } from "./../../services/users.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  usersForm: any;
  user: any;
  newUser = false;
  idUser: any;

  public cpfMask = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  public phoneMask = [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.usersForm = this.fb.group({
      fullName: ["", Validators.required],
      identityId: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      streetAddress: ["", Validators.required],
      number: ["", Validators.required],
      complement: [""],
      neighborhood: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipCode: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    if (localStorage.getItem("user")) {
      this.newUser = false;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.idUser = this.user.id;
      this.usersForm.controls.fullName.setValue(this.user.fullName);
      this.usersForm.controls.identityId.setValue(this.user.identityId);
      this.usersForm.controls.email.setValue(this.user.clientContacts.email);
      this.usersForm.controls.phone.setValue(this.user.clientContacts.phone);
      this.usersForm.controls.streetAddress.setValue(
        this.user.clientAddress.streetAddress
      );
      this.usersForm.controls.number.setValue(this.user.clientAddress.number);
      this.usersForm.controls.complement.setValue(
        this.user.clientAddress.complement
      );
      this.usersForm.controls.neighborhood.setValue(
        this.user.clientAddress.neighborhood
      );
      this.usersForm.controls.city.setValue(this.user.clientAddress.city);
      this.usersForm.controls.state.setValue(this.user.clientAddress.state);
      this.usersForm.controls.zipCode.setValue(this.user.clientAddress.zipCode);
    } else {
      this.newUser = true;
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.salvar({
        fullName: this.usersForm.value.fullName,
        identityId: this.usersForm.value.identityId.replace(/[^\d]+/g, ""),
        clientContacts: {
          email: this.usersForm.value.email,
          phone: this.usersForm.value.phone.replace(/[^\d]+/g, ""),
        },
        clientAddress: {
          streetAddress: this.usersForm.value.streetAddress,
          number: this.usersForm.value.number,
          complement: this.usersForm.value.complement,
          neighborhood: this.usersForm.value.neighborhood,
          city: this.usersForm.value.city,
          state: this.usersForm.value.state,
          zipCode: this.usersForm.value.zipCode.replace(/[^\d]+/g, ""),
        },
      });
    } else {
      this.usersForm["submitted"] = true;
    }
  }

  salvar(usersForm) {
    if (this.newUser) {
      this.usersService.postClients(usersForm).subscribe((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        this.router.navigate(["delivery"]);
      });
    } else {
      this.usersService.putClients(this.idUser, usersForm).subscribe((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        this.router.navigate(["delivery"]);
      });
    }
  }

  back() {
    this.router.navigate(["orders"]);
  }

  userVerify() {
    if (
      this.usersForm.controls.fullName.value !== "" &&
      this.usersForm.controls.identityId.value !== ""
    ) {
      var name = this.usersForm.controls.fullName.value;
      var id = this.usersForm.controls.identityId.value.replace(/[^\d]+/g, "");
      this.usersService.getClientIdentityId(id, name).subscribe((res) => {
        if (res.data.numberOfElements === 0) {
          Swal.fire(
            "Usuário não encontrado!",
            "Por favor, preencher os dados para continuar.",
            "error"
          ).then((res) => {
            this.usersForm.get("email").reset();
            this.usersForm.get("phone").reset();
            this.usersForm.get("streetAddress").reset();
            this.usersForm.get("number").reset();
            this.usersForm.get("complement").reset();
            this.usersForm.get("neighborhood").reset();
            this.usersForm.get("city").reset();
            this.usersForm.get("state").reset();
            this.usersForm.get("zipCode").reset();
          });
        } else {
          this.newUser = false;
          this.idUser = res.data.content[0].id;
          this.usersForm.controls.fullName.setValue(
            res.data.content[0].fullName
          );
          this.usersForm.controls.identityId.setValue(
            res.data.content[0].identityId
          );
          this.usersForm.controls.email.setValue(
            res.data.content[0].clientContacts.email
          );
          this.usersForm.controls.phone.setValue(
            res.data.content[0].clientContacts.phone
          );
          this.usersForm.controls.streetAddress.setValue(
            res.data.content[0].clientAddress.streetAddress
          );
          this.usersForm.controls.number.setValue(
            res.data.content[0].clientAddress.number
          );
          this.usersForm.controls.complement.setValue(
            res.data.content[0].clientAddress.complement
          );
          this.usersForm.controls.neighborhood.setValue(
            res.data.content[0].clientAddress.neighborhood
          );
          this.usersForm.controls.city.setValue(
            res.data.content[0].clientAddress.city
          );
          this.usersForm.controls.state.setValue(
            res.data.content[0].clientAddress.state
          );
          this.usersForm.controls.zipCode.setValue(
            res.data.content[0].clientAddress.zipCode
          );
        }
      });
    } else {
      this.usersForm.controls.fullName.touched = true;
      this.usersForm.controls.identityId.touched = true;
    }
  }
}
