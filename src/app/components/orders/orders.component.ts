import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  ordersForm: any;
  includedOrders = [];
  tableOrders: any;
  halfFlavor = [];
  flavors = [
    "Marguerita",
    "Calabresa",
    "Pepperoni",
    "Frango com Catupiry",
    "Portuguesa",
    "Quatro Queijos",
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.ordersForm = this.fb.group({
      halfNHalf: ["0", Validators.required],
      extraSauce: ["", Validators.required],
      crust: ["", Validators.required],
      mainFlavor: [""],
      marguerita: [false],
      calabresa: [false],
      pepperoni: [false],
      frangoCatupiry: [false],
      portuguesa: [false],
      quatroQueijos: [false],
      size: ["", Validators.required],
      note: [""],
    });
  }

  ngOnInit() {
    if (localStorage.getItem("orders")) {
      this.includedOrders = JSON.parse(localStorage.getItem("orders"));
    }
  }

  changeHalf(flavor: number) {
    if (this.halfFlavor.includes(flavor)) {
      this.halfFlavor.splice(this.halfFlavor.indexOf(flavor), 1);
    } else {
      this.halfFlavor.push(flavor);
    }

    if (this.halfFlavor.length === 2) {
      this.ordersForm.controls.marguerita.value === true
        ? this.ordersForm.controls["marguerita"].enable()
        : this.ordersForm.controls["marguerita"].disable();

      this.ordersForm.controls.calabresa.value === true
        ? this.ordersForm.controls["calabresa"].enable()
        : this.ordersForm.controls["calabresa"].disable();

      this.ordersForm.controls.pepperoni.value === true
        ? this.ordersForm.controls["pepperoni"].enable()
        : this.ordersForm.controls["pepperoni"].disable();

      this.ordersForm.controls.frangoCatupiry.value === true
        ? this.ordersForm.controls["frangoCatupiry"].enable()
        : this.ordersForm.controls["frangoCatupiry"].disable();

      this.ordersForm.controls.portuguesa.value === true
        ? this.ordersForm.controls["portuguesa"].enable()
        : this.ordersForm.controls["portuguesa"].disable();

      this.ordersForm.controls.quatroQueijos.value === true
        ? this.ordersForm.controls["quatroQueijos"].enable()
        : this.ordersForm.controls["quatroQueijos"].disable();
    } else {
      this.ordersForm.controls["marguerita"].enable();
      this.ordersForm.controls["calabresa"].enable();
      this.ordersForm.controls["pepperoni"].enable();
      this.ordersForm.controls["frangoCatupiry"].enable();
      this.ordersForm.controls["portuguesa"].enable();
      this.ordersForm.controls["quatroQueijos"].enable();
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.includedOrders.push({
        halfNHalf:
          this.ordersForm.controls.halfNHalf.value === "0"
            ? "Pizza Inteira"
            : "Meio a Meio",
        extraSauce:
          this.ordersForm.controls.extraSauce.value === "0" ? "Sim" : "Não",
        crust:
          this.ordersForm.controls.crust.value === "0"
            ? "Massa Fina"
            : "Massa Grossa",
        mainFlavor:
          this.ordersForm.controls.mainFlavor.value === "0"
            ? "Marguerita"
            : this.ordersForm.controls.mainFlavor.value === "1"
            ? "Calabresa"
            : this.ordersForm.controls.mainFlavor.value === "2"
            ? "Pepperoni"
            : this.ordersForm.controls.mainFlavor.value === "3"
            ? "Frango com Catupiry"
            : this.ordersForm.controls.mainFlavor.value === "4"
            ? "Portuguesa"
            : this.ordersForm.controls.mainFlavor.value === "5"
            ? "Quatro Queijos"
            : "",
        halfFlavor: this.halfFlavor,
        size:
          this.ordersForm.controls.size.value === "0"
            ? "P"
            : this.ordersForm.controls.size.value === "1"
            ? "M"
            : "G",
        note: this.ordersForm.value.note,
      });
    } else {
      this.ordersForm["submitted"] = true;
    }
  }

  cleanMainFlavor() {
    if (this.ordersForm.controls.halfNHalf.value === "0") {
      this.ordersForm.get("marguerita").reset();
      this.ordersForm.get("calabresa").reset();
      this.ordersForm.get("pepperoni").reset();
      this.ordersForm.get("frangoCatupiry").reset();
      this.ordersForm.get("portuguesa").reset();
      this.ordersForm.get("quatroQueijos").reset();
      this.halfFlavor = [];
      this.ordersForm.controls["marguerita"].enable();
      this.ordersForm.controls["calabresa"].enable();
      this.ordersForm.controls["pepperoni"].enable();
      this.ordersForm.controls["frangoCatupiry"].enable();
      this.ordersForm.controls["portuguesa"].enable();
      this.ordersForm.controls["quatroQueijos"].enable();
    } else {
      this.ordersForm.get("mainFlavor").reset();
      this.halfFlavor = [];
    }
  }

  removeItem(index) {
    this.includedOrders.splice(index, 1);
  }

  cancelar() {
    this.router.navigate(["home"]);
  }

  next() {
    if (this.includedOrders.length === 0) {
      Swal.fire("Oops...", "Adicione pelo menos um pedido", "error");
    } else {
      localStorage.setItem("orders", JSON.stringify(this.includedOrders));
      this.router.navigate(["users"]);
    }
  }
}
