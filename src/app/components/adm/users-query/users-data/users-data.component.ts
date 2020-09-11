import { UsersService } from "../../../../services/users.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-users-data",
  templateUrl: "./users-data.component.html",
  styleUrls: ["./users-data.component.css"],
})
export class UsersDataComponent implements OnInit {
  usersForm: any;
  id: any;
  data: any;
  private routeSubscription: any;

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersForm = this.fb.group({
      fullName: [{ value: "", disabled: true }, Validators.required],
      identityId: [{ value: "", disabled: true }, Validators.required],
      email: [{ value: "", disabled: true }, Validators.required],
      phone: [{ value: "", disabled: true }, Validators.required],
      streetAddress: [{ value: "", disabled: true }, Validators.required],
      number: [{ value: "", disabled: true }, Validators.required],
      complement: [{ value: "", disabled: true }],
      neighborhood: [{ value: "", disabled: true }, Validators.required],
      city: [{ value: "", disabled: true }, Validators.required],
      state: [{ value: "", disabled: true }, Validators.required],
      zipCode: [{ value: "", disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.getDataClient();
  }

  getDataClient() {
    this.usersService.getClientId(this.id).subscribe((res) => {
      this.data = res.data;

      this.usersForm.controls.fullName.setValue(res.data.fullName);
      this.usersForm.controls.identityId.setValue(res.data.identityId);
      this.usersForm.controls.email.setValue(res.data.clientContacts.email);
      this.usersForm.controls.phone.setValue(res.data.clientContacts.phone);
      this.usersForm.controls.streetAddress.setValue(
        res.data.clientAddress.streetAddress
      );
      this.usersForm.controls.number.setValue(res.data.clientAddress.number);
      this.usersForm.controls.complement.setValue(
        res.data.clientAddress.complement
      );
      this.usersForm.controls.neighborhood.setValue(
        res.data.clientAddress.neighborhood
      );
      this.usersForm.controls.city.setValue(res.data.clientAddress.city);
      this.usersForm.controls.state.setValue(res.data.clientAddress.state);
      this.usersForm.controls.zipCode.setValue(res.data.clientAddress.zipCode);
    });
  }

  back() {
    this.router.navigate(["users-query"]);
  }

  deleteUser() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Você tem certeza?",
        text: "Você não será capaz de reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usersService.deleteClients(this.id).subscribe(
            (res) => {
              swalWithBootstrapButtons.fire(
                "Deletado!",
                "Cliente deletado",
                "success"
              );

              this.router.navigate(["users-query"]);
            },
            (error) => {
              Swal.fire("Ops...", error.errors[0], "error");
            }
          );
        }
      });
  }
}
