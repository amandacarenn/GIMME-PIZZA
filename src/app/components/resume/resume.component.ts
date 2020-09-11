import { element } from "protractor";
import { PizzaOrdersService } from "./../../services/pizza-orders.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-resume",
  templateUrl: "./resume.component.html",
  styleUrls: ["./resume.component.css"],
})
export class ResumeComponent implements OnInit {
  pizzaOrders: any;
  client: any;
  pizzas = [];
  deliveryAddress: any;
  flavors = [
    "Marguerita",
    "Calabresa",
    "Pepperoni",
    "Frango com Catupiry",
    "Portuguesa",
    "Quatro Queijos",
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pizzaOrdersService: PizzaOrdersService
  ) {}

  ngOnInit() {
    this.getDataClient();
    this.getDataPizzas();
    this.getDataDeliveryAddress();
  }

  getDataClient() {
    this.client = JSON.parse(localStorage.getItem("user"));
  }

  getDataPizzas() {
    this.pizzas = JSON.parse(localStorage.getItem("orders"));
  }

  getDataDeliveryAddress() {
    this.deliveryAddress = JSON.parse(localStorage.getItem("deliveryData"));
  }

  submitOrder() {
    const pizzas = this.pizzas;

    pizzas.map((pizza) => {
      pizza.halfNHalf = pizza.halfNHalf === "Meio a Meio" ? true : false;
      pizza.extraSauce = pizza.extraSauce === "Não" ? false : true;
      pizza.crust = pizza.crust.substring(16, 6).toUpperCase();
      pizza.mainFlavor =
        pizza.mainFlavor === ""
          ? this.flavors[pizza.halfFlavor[0]].replace(/\s/g, "_").toUpperCase()
          : pizza.mainFlavor.replace(/\s/g, "_").toUpperCase();
      pizza.secondaryFlavor =
        pizza.halfNHalf === true
          ? this.flavors[pizza.halfFlavor[1]].replace(/\s/g, "_").toUpperCase()
          : null;
      pizza.size = pizza.size;
      pizza.note = pizza.note;
      pizza.halfFlavor = null;
    });

    this.pizzaOrders = {
      client: {
        id: this.client.id,
        clientContacts: {
          email: this.client.clientContacts.email,
          phone: this.client.clientContacts.phone,
        },
        clientAddress: {
          streetAddress: this.client.clientAddress.streetAddress,
          number: this.client.clientAddress.number,
          complement: this.client.clientAddress.complement,
          neighborhood: this.client.clientAddress.neighborhood,
          city: this.client.clientAddress.city,
          state: this.client.clientAddress.state,
          zipCode: this.client.clientAddress.zipCode,
        },
        fullName: this.client.fullName,
        identityId: this.client.identityId,
      },
      pizzas: pizzas,
      deliveryAddress: {
        streetAddress: this.deliveryAddress[0].deliveryAddress.streetAddress,
        number: this.deliveryAddress[0].deliveryAddress.number,
        complement: this.deliveryAddress[0].deliveryAddress.complement,
        neighborhood: this.deliveryAddress[0].deliveryAddress.neighborhood,
        city: this.deliveryAddress[0].deliveryAddress.city,
        state: this.deliveryAddress[0].deliveryAddress.state,
        zipCode: this.deliveryAddress[0].deliveryAddress.zipCode,
      },
      scheduled: this.deliveryAddress[0].scheduled,
      scheduledDate: this.deliveryAddress[0].scheduledDate,
      scheduledTime: this.deliveryAddress[0].scheduledTime,
    };

    this.pizzaOrdersService
      .postPizzaOrders(this.pizzaOrders)
      .subscribe((res) => {
        Swal.fire(
          "Pedido Concluído!",
          "Entraremos em contato para confirmar o pedido.",
          "success"
        ).then((res) => {
          localStorage.setItem(
            "orderCompleted",
            JSON.stringify(this.pizzaOrders)
          );
          this.router.navigate(["home"]);
        });
      });
  }
}
