import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInventory } from './delete-inventory';

describe('DeleteInventory', () => {
  let component: DeleteInventory;
  let fixture: ComponentFixture<DeleteInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
