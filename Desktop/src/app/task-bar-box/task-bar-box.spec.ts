import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBarBox } from './task-bar-box';

describe('TaskBarBox', () => {
  let component: TaskBarBox;
  let fixture: ComponentFixture<TaskBarBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBarBox],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBarBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
