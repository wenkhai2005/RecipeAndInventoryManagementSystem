import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInventory } from './all-inventory';

describe('AllInventory', () => {
  let component: AllInventory;
  let fixture: ComponentFixture<AllInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
