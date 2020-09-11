import { PizzaOrdersService } from "./../../../services/pizza-orders.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-orders-control",
  templateUrl: "./orders-control.component.html",
  styleUrls: ["./orders-control.component.css"],
})
export class OrdersControlComponent implements OnInit {
  aberto = "ABERTO";
  contatarCliente = "CONTATAR_CLIENTE";
  preparando = "PREPARANDO";
  saiuEntrega = "SAIU_PARA_ENTREGA";
  entregue = "ENTREGUE";
  cancelado = "CANCELADO";
  finalizado = "FINALIZADO";
  pedidos = [];

  constructor(private pizzaOrdersService: PizzaOrdersService) {}

  ngOnInit() {
    this.getDataClient(this.aberto);
  }

  getDataClient(status) {
    this.pizzaOrdersService.getPizza(status).subscribe((res) => {
      this.pedidos = res.data;
      if (this.pedidos === null) {
        this.pedidos = [];
      } else {
        this.pedidos = this.pedidos;
      }
    });
  }
}
