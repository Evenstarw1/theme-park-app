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
    categories: string[];
    comments: string[];
    attractions: string[];

    constructor(
        id: string,
        name: string,
        description: string,
        picture: string,
        latitude: number,
        longitude: number,
        categories: string[],
        comments: string[],
        attractions: string[]
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
