import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmoutMePage } from './amout-me-page';

describe('AmoutMePage', () => {
  let component: AmoutMePage;
  let fixture: ComponentFixture<AmoutMePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmoutMePage],
    }).compileComponents();

    fixture = TestBed.createComponent(AmoutMePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
