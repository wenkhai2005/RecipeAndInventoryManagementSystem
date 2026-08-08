import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRecipe } from './choose-recipe';

describe('ChooseRecipe', () => {
  let component: ChooseRecipe;
  let fixture: ComponentFixture<ChooseRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
