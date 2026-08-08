import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipe } from './all-recipe';

describe('AllRecipe', () => {
  let component: AllRecipe;
  let fixture: ComponentFixture<AllRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
