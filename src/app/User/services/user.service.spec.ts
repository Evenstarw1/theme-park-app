import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { throwError } from "rxjs";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { UserDTO } from "../models/user.dto";
import { UserService } from "./user.service";

describe("UserService", () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    let sharedServiceMock: jasmine.SpyObj<SharedService>;

    beforeEach(() => {
        sharedServiceMock = jasmine.createSpyObj("SharedService", ["handleError"]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService, { provide: SharedService, useValue: sharedServiceMock }],
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("register", () => {
        it("should register a user and return the user data", () => {
            const user: UserDTO = {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                birth_date: "1990-01-01",
                city: "New York",
                profile_picture: "url_to_picture",
                description: "This is a description.",
                categories: ["User"],
                access_level: 1,
            };

            service.register(user).subscribe((response) => {
                expect(response).toEqual(user);
            });

            const req = httpMock.expectOne("/api/pub/register");
            expect(req.request.method).toBe("POST");
            req.flush(user);
        });

        it("should call handleError on error", () => {
            const user: UserDTO = {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                birth_date: "1990-01-01",
                city: "New York",
                profile_picture: "url_to_picture",
                description: "This is a description.",
                categories: ["User"],
                access_level: 1,
            };

            sharedServiceMock.handleError.and.returnValue(throwError(() => new Error("Server Error")));

            service.register(user).subscribe({
                next: () => {
                    fail("Expected an error, but got a successful response");
                },
                error: (error) => {
                    expect(sharedServiceMock.handleError).toHaveBeenCalled();
                    expect(error.message).toContain("Server Error");
                },
            });

            const req = httpMock.expectOne("/api/pub/register");
            req.flush(null, { status: 500, statusText: "Server Error" });
        });
    });

    describe("updateUser", () => {
        it("should update user and return updated user data", () => {
            const userId = "1";
            const user: UserDTO = {
                id: userId,
                name: "Jane Doe",
                email: "jane@example.com",
                birth_date: "1990-01-01",
                city: "Los Angeles",
                profile_picture: "url_to_picture",
                description: "Updated description.",
                categories: ["Admin"],
                access_level: 2,
            };

            service.updateUser(userId, user).subscribe((response) => {
                expect(response).toEqual(user);
            });

            const req = httpMock.expectOne(`/api/priv/users/${userId}`);
            expect(req.request.method).toBe("PATCH");
            req.flush(user);
        });
    });

    describe("getUserById", () => {
        it("should return the user data by ID", () => {
            const userId = "1";
            const user: UserDTO = {
                id: userId,
                name: "John Doe",
                email: "john@example.com",
                birth_date: "1990-01-01",
                city: "New York",
                profile_picture: "url_to_picture",
                description: "This is a description.",
                categories: ["User"],
                access_level: 1,
            };

            service.getUserById(userId).subscribe((response) => {
                expect(response).toEqual(user);
            });

            const req = httpMock.expectOne(`/api/priv/users/${userId}`);
            expect(req.request.method).toBe("GET");
            req.flush(user);
        });
    });

    describe("getAllUsers", () => {
        it("should return a list of all users", () => {
            const users: UserDTO[] = [
                {
                    id: "1",
                    name: "John Doe",
                    email: "john@example.com",
                    birth_date: "1990-01-01",
                    city: "New York",
                    profile_picture: "url_to_picture",
                    description: "This is a description.",
                    categories: ["User"],
                    access_level: 1,
                },
                {
                    id: "2",
                    name: "Jane Doe",
                    email: "jane@example.com",
                    birth_date: "1992-02-02",
                    city: "Los Angeles",
                    profile_picture: "url_to_picture",
                    description: "This is another description.",
                    categories: ["Admin"],
                    access_level: 2,
                },
            ];

            service.getAllUsers().subscribe((response) => {
                expect(response).toEqual(users);
            });

            const req = httpMock.expectOne("/api/priv/users");
            expect(req.request.method).toBe("GET");
            req.flush(users);
        });
    });

    afterEach(() => {
        httpMock.verify();
    });
});
