import { TestBed } from "@angular/core/testing";

import { ParksService } from "./parks.service";

describe("ParksListService", () => {
    let service: ParksService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ParksService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
