import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { throwError } from "rxjs";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { AuthDTO } from "../models/auth.dto";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let sharedServiceMock: jasmine.SpyObj<SharedService>;

    beforeEach(() => {
        sharedServiceMock = jasmine.createSpyObj("SharedService", ["handleError"]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, { provide: SharedService, useValue: sharedServiceMock }],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("login", () => {
        it("should return AuthToken when login is successful", () => {
            const auth: AuthDTO = {
                email: "john@example.com",
                password: "password123",
                user_id: "",
                access_token: "",
            };
            const mockAuthToken = { user_id: "1", access_token: "some-token" };

            service.login(auth).subscribe((response) => {
                expect(response).toEqual(mockAuthToken);
            });

            const req = httpMock.expectOne("/api/pub/login");
            expect(req.request.method).toBe("POST");
            expect(req.request.body).toEqual(auth);

            req.flush(mockAuthToken);
        });

        it("should call handleError on error", () => {
            const auth: AuthDTO = {
                email: "john@example.com",
                password: "password123",
                user_id: "",
                access_token: "",
            };
            const errorResponse = { status: 500, statusText: "Server Error" };

            sharedServiceMock.handleError.and.returnValue(throwError(() => new HttpErrorResponse(errorResponse)));

            service.login(auth).subscribe({
                next: () => {
                    fail("Expected an error, but got a successful response");
                },
                error: (error) => {
                    expect(sharedServiceMock.handleError).toHaveBeenCalled();
                    expect(error.status).toBe(500);
                    expect(error.statusText).toBe("Server Error");
                },
            });

            const req = httpMock.expectOne("/api/pub/login");
            req.flush(null, errorResponse);
        });
    });

    afterEach(() => {
        httpMock.verify();
    });
});
