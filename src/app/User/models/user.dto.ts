export class UserDTO {
  id?: string;
  access_token?: string;
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  city: string;
  profile_picture: string;
  description: string;

  constructor(
    name: string,
    birth_date: Date,
    email: string,
    password: string,
    city: string,
    profile_picture: string,
    description: string,
  ) {
    this.name = name;
    this.birth_date = birth_date;
    this.email = email;
    this.password = password;
    this.city = city;
    this.profile_picture = profile_picture;
    this.description = description;
  }
}
