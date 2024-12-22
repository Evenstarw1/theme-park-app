import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksDetailComponent } from './parks-detail.component';

describe('ParksDetailComponent', () => {
  let component: ParksDetailComponent;
  let fixture: ComponentFixture<ParksDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParksDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
