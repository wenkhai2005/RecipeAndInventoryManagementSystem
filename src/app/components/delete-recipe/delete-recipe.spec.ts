import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipe } from './delete-recipe';

describe('DeleteRecipe', () => {
  let component: DeleteRecipe;
  let fixture: ComponentFixture<DeleteRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
