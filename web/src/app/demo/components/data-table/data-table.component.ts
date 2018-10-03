import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CarService } from '../../../core/car.service';
import { UserService } from '../../../core/services/user.service';
import { Car } from '../../domain/car';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
  ];
  cars: Car[];
  blackCars: Car[];
  whiteCars: Car[];

  selectedCar: Car;

  @ViewChild('filter')
  filter: NgModel;

  pageChange$ = new Subject<any>();
  sortChange$ = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  filterText($event) {}

  pageChange($event) {
    console.log($event);
    this.pageChange$.next($event);
  }

  sortChange($event) {
    console.log($event);
    this.sortChange$.next($event);
  }

  navigateToDetail(id) {
    this.router.navigate(['/datatable', id]);
  }
}
