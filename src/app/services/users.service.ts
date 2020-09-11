import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  httpHeaders: HttpHeaders;
  BASEURL: string;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    this.BASEURL = environment.baseUrl;
  }

  getClients(): Observable<any> {
    return this.http.get(`${this.BASEURL}/clients`, {
      headers: this.httpHeaders,
    });
  }

  getClientId(id): Observable<any> {
    return this.http.get(`${this.BASEURL}/clients/${id}`, {
      headers: this.httpHeaders,
    });
  }

  postClients(body: any) {
    return this.http.post<any>(`${this.BASEURL}/clients`, body, {
      headers: this.httpHeaders,
    });
  }

  putClients(id: any, body: any) {
    return this.http.put<any>(`${this.BASEURL}/clients/${id}`, body, {
      headers: this.httpHeaders,
    });
  }

  deleteClients(id: any) {
    return this.http.delete(`${this.BASEURL}/clients/${id}`, {
      headers: this.httpHeaders,
    });
  }

  getClientIdentityId(id, name): Observable<any> {
    return this.http.get(`${this.BASEURL}/clients`, {
      headers: this.httpHeaders,
      params: {
        clientIdentityId: id,
        fullName: name,
      },
    });
  }
}
