export class ParksDTO {
    id: string;
    name: string;
    picture: string;

    constructor(id: string, name: string, picture: string) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }
}

export class ParkDetailDTO {
    id: string;
    name: string;
    description: string;
    picture: string;
    latitude: number;
    longitude: number;
    categories: Category[];
    comments: Comment[];
    attractions: Attraction[];

    constructor(
        id: string,
        name: string,
        description: string,
        picture: string,
        latitude: number,
        longitude: number,
        categories: Category[],
        comments: Comment[],
        attractions: Attraction[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.latitude = latitude;
        this.longitude = longitude;
        this.categories = categories;
        this.comments = comments;
        this.attractions = attractions;
    }
}

export interface Category {
    id: number;
    name: string;
    created: string;
}

export interface Comment {
    id: number;
    user_id: number;
    user_name: string;
    comment: string;
    created: string;
}

export interface Attraction {
    id: number;
    themepark_id: number;
    name: string;
    created: string;
}
