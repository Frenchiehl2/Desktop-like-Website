import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRenderer } from './model-renderer';

describe('ModelRenderer', () => {
  let component: ModelRenderer;
  let fixture: ComponentFixture<ModelRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
