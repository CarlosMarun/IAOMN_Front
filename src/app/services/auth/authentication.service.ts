import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { User } from "../../_models/user";

const URL_API = environment.API.EndPoint.Auth;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: object) {
    return this.http.post(`${URL_API}login`, user).pipe(
      map((result: any) => {
        localStorage.setItem("currentUser", JSON.stringify(result.token));
        this.currentUserSubject.next(result.token);
        return result;
      })
    );
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  register(user: User) {
    return this.http.post(`${URL_API}createUser`, user);
  }
  delete(id: string) {
    return this.http.post(
      `${URL_API}deleteUser`,
      { id: id },
      {
        headers: { Authorization: `Bearer ${this.currentUserValue}` },
      }
    );
  }
  getUsers() {
    return this.http.get(`${URL_API}getUsers`, {
      headers: { Authorization: `Bearer ${this.currentUserValue}` },
    });
  }
}
