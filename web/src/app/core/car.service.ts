import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from '../demo/domain/car';
import { CarData } from '../demo/domain/car-data';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(keyword: string = '', sort = {}, page = {}): Observable<Car[]> {
    return this.httpClient
      .get<CarData>(`assets/demo/data/cars-medium.json?keyword=${keyword}`)
      .pipe(map(result => result.data));
  }
}
