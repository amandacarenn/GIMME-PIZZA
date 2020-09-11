import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-delivery",
  templateUrl: "./delivery.component.html",
  styleUrls: ["./delivery.component.css"],
})
export class DeliveryComponent implements OnInit {
  deliveryForm: any;
  addressDelivery: any;
  deliveryData = [];
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  };
  minDate = new Date();
  minTime: "18:00";
  maxTime: "23:59";
  foundData: any;

  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder, private router: Router) {
    this.deliveryForm = this.fb.group({
      scheduled: ["1", Validators.required],
      scheduledDate: [""],
      scheduledTime: [""],
      address: ["0"],
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
    this.getAddress();

    if (localStorage.getItem("deliveryData")) {
      this.foundData = JSON.parse(localStorage.getItem("deliveryData"));
      this.deliveryForm.controls.scheduled.setValue(
        this.foundData[0].scheduled === true ? "0" : "1"
      );
      this.deliveryForm.controls.scheduledDate.setValue(
        new Date(
          this.foundData[0].scheduledDate +
            "T" +
            this.foundData[0].scheduledTime
        )
      );
      this.deliveryForm.controls.scheduledTime.setValue(
        this.foundData[0].scheduledTime
      );
      this.deliveryForm.controls.address.setValue(this.foundData[0].address);
      this.deliveryForm.controls.streetAddress.setValue(
        this.foundData[0].deliveryAddress.streetAddress
      );
      this.deliveryForm.controls.number.setValue(
        this.foundData[0].deliveryAddress.number
      );
      this.deliveryForm.controls.complement.setValue(
        this.foundData[0].deliveryAddress.complement
      );
      this.deliveryForm.controls.neighborhood.setValue(
        this.foundData[0].deliveryAddress.neighborhood
      );
      this.deliveryForm.controls.city.setValue(
        this.foundData[0].deliveryAddress.city
      );
      this.deliveryForm.controls.state.setValue(
        this.foundData[0].deliveryAddress.state
      );
      this.deliveryForm.controls.zipCode.setValue(
        this.foundData[0].deliveryAddress.zipCode
      );
    }
  }

  getAddress() {
    if (localStorage.getItem("user")) {
      this.addressDelivery = JSON.parse(localStorage.getItem("user"));
      this.deliveryForm.controls.streetAddress.setValue(
        this.addressDelivery.clientAddress.streetAddress
      );
      this.deliveryForm.controls.number.setValue(
        this.addressDelivery.clientAddress.number
      );
      this.deliveryForm.controls.complement.setValue(
        this.addressDelivery.clientAddress.complement
      );
      this.deliveryForm.controls.neighborhood.setValue(
        this.addressDelivery.clientAddress.neighborhood
      );
      this.deliveryForm.controls.city.setValue(
        this.addressDelivery.clientAddress.city
      );
      this.deliveryForm.controls.state.setValue(
        this.addressDelivery.clientAddress.state
      );
      this.deliveryForm.controls.zipCode.setValue(
        this.addressDelivery.clientAddress.zipCode
      );

      this.deliveryForm.controls["streetAddress"].disable();
      this.deliveryForm.controls["number"].disable();
      this.deliveryForm.controls["complement"].disable();
      this.deliveryForm.controls["neighborhood"].disable();
      this.deliveryForm.controls["city"].disable();
      this.deliveryForm.controls["state"].disable();
      this.deliveryForm.controls["zipCode"].disable();
    }
  }

  newAddress() {
    if (localStorage.getItem("deliveryData")) {
    } else {
      this.deliveryForm.get("streetAddress").reset();
      this.deliveryForm.get("number").reset();
      this.deliveryForm.get("complement").reset();
      this.deliveryForm.get("neighborhood").reset();
      this.deliveryForm.get("city").reset();
      this.deliveryForm.get("state").reset();
      this.deliveryForm.get("zipCode").reset();
    }

    this.deliveryForm.controls["streetAddress"].enable();
    this.deliveryForm.controls["number"].enable();
    this.deliveryForm.controls["complement"].enable();
    this.deliveryForm.controls["neighborhood"].enable();
    this.deliveryForm.controls["city"].enable();
    this.deliveryForm.controls["state"].enable();
    this.deliveryForm.controls["zipCode"].enable();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.deliveryData.push({
        address: this.deliveryForm.value.address,
        deliveryAddress: {
          streetAddress: this.deliveryForm.controls.streetAddress.value,
          number: this.deliveryForm.controls.number.value,
          complement: this.deliveryForm.controls.complement.value,
          neighborhood: this.deliveryForm.controls.neighborhood.value,
          city: this.deliveryForm.controls.city.value,
          state: this.deliveryForm.controls.state.value,
          zipCode: this.deliveryForm.controls.zipCode.value,
        },
        scheduled: this.deliveryForm.value.scheduled === "0" ? true : false,
        scheduledDate:
          this.deliveryForm.value.scheduled === "1"
            ? ""
            : (this.deliveryForm.value.scheduledDate = this.deliveryForm.value.scheduledDate
                .toISOString()
                .slice(0, 10)),
        scheduledTime:
          this.deliveryForm.value.scheduled === "1"
            ? ""
            : this.deliveryForm.value.scheduledTime.substring(-8, 2) === "6:"
            ? "18:" + this.deliveryForm.value.scheduledTime.substring(4, 2)
            : this.deliveryForm.value.scheduledTime.substring(-8, 2) === "7:"
            ? "19:" + this.deliveryForm.value.scheduledTime.substring(4, 2)
            : this.deliveryForm.value.scheduledTime.substring(-8, 2) === "8:"
            ? "20:" + this.deliveryForm.value.scheduledTime.substring(4, 2)
            : this.deliveryForm.value.scheduledTime.substring(-8, 2) === "9:"
            ? "21:" + this.deliveryForm.value.scheduledTime.substring(4, 2)
            : this.deliveryForm.value.scheduledTime.substring(-8, 2) === "10"
            ? "22:" + this.deliveryForm.value.scheduledTime.substring(5, 3)
            : "23:" + this.deliveryForm.value.scheduledTime.substring(5, 3),
      });
      localStorage.setItem("deliveryData", JSON.stringify(this.deliveryData));
      this.router.navigate(["resume"]);
    } else {
      this.deliveryForm["submitted"] = true;
    }
  }
}
