import * as UserAction from '../../actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { UserDTO } from '../../models/user.dto';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  registerUser: UserDTO;
  private userId: string;
  formSubmitted = false;

  name: FormControl;
  birth_date: FormControl;
  city: FormControl;
  profile_picture: FormControl;
  description: FormControl;

  editProfileForm: FormGroup;
  isValidForm: boolean | null;
  profilePicture: string | ArrayBuffer | null = null;

  categories = new FormControl([]);
  categoryList: string[] = ['familiar', 'aventura', 'emociones fuertes', 'acuatico'];

  get categoriesDisplayText(): string {
    const selectedCategories = this.categories.value || [];
    if (selectedCategories.length === 0) return '';
    if (selectedCategories.length === 1) return selectedCategories[0];
    return `${selectedCategories[0]} (+${selectedCategories.length - 1} ${
      selectedCategories.length === 2 ? 'otra' : 'otras'
    })`;
  }

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.registerUser = new UserDTO('', '', '', '', '', '', '', []);
    this.userId = '';
    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      this.registerUser.birth_date
        ? formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en')
        : null,
      [Validators.required]
    );

    this.city = new FormControl(this.registerUser.city);

    this.profile_picture = new FormControl(null);

    this.description = new FormControl(null);

    this.editProfileForm = this.formBuilder.group({
      name: this.name,
      birth_date: this.birth_date,
      city: this.city,
      profile_picture: this.profile_picture,
      description: this.description,
      categories: this.categories,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials?.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.store.dispatch(UserAction.getUserById({ userId: this.userId }));

      this.store.select((state) => state.user.user).subscribe((user) => {
        if (user) {
          this.editProfileForm.patchValue({
            name: user.name,
            birth_date: formatDate(user.birth_date, 'yyyy-MM-dd', 'en'),
            city: user.city,
            profile_picture: user.profile_picture,
            description: user.description,
            categories: user.categories,
          });
        }
      });
    }
  }

  editProfile(): void {
    this.isValidForm = false;
    this.formSubmitted = true;

    // if (this.editProfileForm.invalid) {
    //   return;
    // }

    this.isValidForm = true;
    this.registerUser = this.editProfileForm.value;

    let formattedBirthDate: string | null = null;
    if (this.registerUser.birth_date) {
      const parsedDate = new Date(this.registerUser.birth_date);
      if (!isNaN(parsedDate.getTime())) {
        formattedBirthDate = parsedDate.toISOString();
      } else {
        console.error('Invalid date value for birth_date:', this.registerUser.birth_date);
      }
    }

    const user: UserDTO = {
      id: this.userId,
      name: this.registerUser.name,
      birth_date: formattedBirthDate || '',
      email: '',
      password: '',
      city: this.registerUser.city,
      profile_picture: this.editProfileForm.value.profile_picture,
      description: this.registerUser.description,
      categories: this.editProfileForm.get('categories')?.value || [],
    };

    console.log(user, 'user');
    this.store.dispatch(UserAction.updateUser({ userId: this.userId, user }));
  }
}
