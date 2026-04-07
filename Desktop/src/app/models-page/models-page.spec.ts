import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsPage } from './models-page';

describe('ModelsPage', () => {
  let component: ModelsPage;
  let fixture: ComponentFixture<ModelsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
