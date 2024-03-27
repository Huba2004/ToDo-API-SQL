import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredTasksAlertComponent } from './expired-tasks-alert.component';

describe('ExpiredTasksAlertComponent', () => {
  let component: ExpiredTasksAlertComponent;
  let fixture: ComponentFixture<ExpiredTasksAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredTasksAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredTasksAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
