import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../../core/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  num1 = 1;
  num2 = 2;
  result;
  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {}

  calculate() {
    this.result = this.calculatorService.addTwoNumbers(this.num1, this.num2);
  }
}
