import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTranslation } from './language-translation';

describe('LanguageTranslation', () => {
  let component: LanguageTranslation;
  let fixture: ComponentFixture<LanguageTranslation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageTranslation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageTranslation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
