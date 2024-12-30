import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksRecomendationsComponent } from './parks-recomendations.component';

describe('ParksRecomendationsComponent', () => {
  let component: ParksRecomendationsComponent;
  let fixture: ComponentFixture<ParksRecomendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParksRecomendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParksRecomendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
