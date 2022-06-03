import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySchedulesComponent } from './day-schedules.component';

describe('DaySchedulesComponent', () => {
  let component: DaySchedulesComponent;
  let fixture: ComponentFixture<DaySchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaySchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
