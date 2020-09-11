import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  httpHeaders: HttpHeaders;
  BASEURL: string;

  constructor(private http: HttpClient) {
    this.BASEURL = environment.baseUrl;
  }

  token(username: string, password: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      Authorization: "Basic " + window.btoa(username + ":" + password),
    });
    return this.http.post(
      `${this.BASEURL}/authentication`,
      {},
      {
        headers: this.httpHeaders,
      }
    );
  }
}
