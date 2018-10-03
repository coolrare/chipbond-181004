import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';

export function NameExistValidator(userService: UserService) {
  return (control: AbstractControl) =>
    timer(300).pipe(
      switchMap(_ => userService.checkUserExist(control.value)),
      map(result => (result ? { name_exist: true } : null))
    );
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpData = this.fb.group({
    Name: this.fb.control('Mike', null, [NameExistValidator(this.userService)]),
    Sex: this.fb.control('M'),
    Interest: this.fb.control('Angular')
  });

  interests = [{ value: 1, label: 'Angular' }, { value: 2, label: 'JavaScript' }, { value: 3, label: 'TypeScript' }];

  signUpSuccess = false;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {}

  signUp() {
    console.log(this.signUpData);
    setTimeout(() => {
      this.signUpSuccess = true;
    }, 1000);
  }
}
