import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PizzaOrdersService {
  httpHeaders: HttpHeaders;
  BASEURL: string;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    this.BASEURL = environment.baseUrl;
  }

  postPizzaOrders(body: any) {
    return this.http.post<any>(`${this.BASEURL}/pizza-orders`, body, {
      headers: this.httpHeaders,
    });
  }

  getPizza(status): Observable<any> {
    return this.http.get(`${this.BASEURL}/pizza-orders`, {
      headers: this.httpHeaders,
      params: {
        status: status,
      },
    });
  }

  putStatus(pizzaOrderId: any) {
    return this.http.put<any>(`${this.BASEURL}/pizza-orders/${pizzaOrderId}`, {
      headers: this.httpHeaders,
    });
  }
}
