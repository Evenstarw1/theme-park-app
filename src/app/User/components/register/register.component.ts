// import * as UserAction from '../../actions';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
// import { AppState } from 'src/app/app.reducers';
// import { Store } from '@ngrx/store';
import { UserDTO } from '../../models/user.dto';
import { formatDate } from '@angular/common';
import { CustomValidators } from '../../../Shared/custom-validators'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;
  formSubmitted = false;


  name: FormControl;
  birth_date: FormControl;
  email: FormControl;
  confirmEmail: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  city: FormControl;
  profile_picture: FormControl;
  description: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;
  profilePicture: string | ArrayBuffer | null = null;

  categories = new FormControl([]);
  categoryList: string[] = [
    'familiar',
    'aventura',
    'emociones fuertes',
    'acuatico'
  ];
  //Llamar endpoint categories para rellenar el array.

  get categoriesDisplayText(): string {
    const selectedCategories = this.categories.value || [];
    if (selectedCategories.length === 0) return '';
    if (selectedCategories.length === 1) return selectedCategories[0];
    return `${selectedCategories[0]} (+${selectedCategories.length - 1} ${
      selectedCategories.length === 2 ? 'otra' : 'otras'
    })`;
  }


  constructor(
    private formBuilder: FormBuilder,
    // private store: Store<AppState>
  ) {
    this.registerUser = new UserDTO('', new Date(),'', '', '',  '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.confirmEmail = new FormControl('', [Validators.required]);


    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    this.city = new FormControl(this.registerUser.city);

    this.profile_picture = new FormControl(null);

    this.description = new FormControl(this.registerUser.description, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      birth_date: this.birth_date,
      email: this.email,
      confirmEmail: this.confirmEmail,
      password: this.password,
      confirmPassword: this.confirmPassword,
      city: this.city,
      profile_picture: this.profile_picture,
      description: this.description,
    },
    {
      validators: [
        CustomValidators.match('password', 'confirmPassword', 'password-mismatch'),
        CustomValidators.match('email', 'confirmEmail', 'email-mismatch')
      ]
    });
  }

  ngOnInit(): void {}


  register(): void {
    this.isValidForm = false;
    this.formSubmitted = true;


    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      name: this.registerUser.name,
      birth_date: this.registerUser.birth_date,
      email: this.registerUser.email,
      password: this.registerUser.password,
      city: this.registerUser.city,
      profile_picture: this.registerForm.value.profile_picture,
      description: this.registerUser.description,
    };

    console.log(user, 'user');
    // this.store.dispatch(UserAction.register({ user }));
  }


}
