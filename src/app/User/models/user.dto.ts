export class UserDTO {
    id?: string;
    access_token?: string;
    name: string;
    email?: string;
    password?: string;
    birth_date: string;
    city: string;
    profile_picture: string;
    description: string;
    categories: string[];
    access_level: number;

    constructor(
        name: string,
        birth_date: string,
        email: string,
        password: string,
        city: string,
        profile_picture: string,
        description: string,
        categories: string[],
        access_level: number
    ) {
        this.name = name;
        this.birth_date = birth_date;
        this.email = email;
        this.password = password;
        this.city = city;
        this.profile_picture = profile_picture;
        this.description = description;
        this.categories = categories;
        this.access_level = access_level;
    }
}
