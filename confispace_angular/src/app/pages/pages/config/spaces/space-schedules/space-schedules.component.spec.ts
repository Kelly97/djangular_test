import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSchedulesComponent } from './space-schedules.component';

describe('SpaceSchedulesComponent', () => {
  let component: SpaceSchedulesComponent;
  let fixture: ComponentFixture<SpaceSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
