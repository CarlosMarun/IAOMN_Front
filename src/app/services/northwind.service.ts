import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

const URL_API = environment.API.EndPoint.Northwind;

@Injectable({
  providedIn: "root",
})
export class NorthwindService {
  constructor(private http: HttpClient) {}

  getItemsByDimension(dimension: string, orden: string) {
    return this.http
      .get(`${URL_API}GetItemsByDimension/${dimension}/${orden}`)
      .pipe(map((result: any) => result.datosDimension));
  }
  getDataByDimension(dimension: string, orden: string, values: string[]) {
    return this.http
      .post(`${URL_API}GetDataByDimension/${dimension}/${orden}`, values)
      .pipe(map((result: any) => result));
  }
  getDataYearByDimension(dimension: string, year:string, orden: string, values: object ){
    return this.http
      .post(`${URL_API}GetDataYearByDimension/${dimension}/${year}/${orden}`, values)
      .pipe(map((result: any) => result));
  }
}
