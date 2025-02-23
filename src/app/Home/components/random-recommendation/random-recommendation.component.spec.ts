import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRecommendationComponent } from './random-recommendation.component';

describe('RandomRecommendationComponent', () => {
  let component: RandomRecommendationComponent;
  let fixture: ComponentFixture<RandomRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
