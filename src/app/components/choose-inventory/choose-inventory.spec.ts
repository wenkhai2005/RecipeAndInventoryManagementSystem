import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseInventory } from './choose-inventory';

describe('ChooseInventory', () => {
  let component: ChooseInventory;
  let fixture: ComponentFixture<ChooseInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
