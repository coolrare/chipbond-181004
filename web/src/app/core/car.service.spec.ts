import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { CarService } from './car.service';

describe('CarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CarService], (service: CarService) => {
    expect(service).toBeTruthy();
  }));
});
