import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsWidgetComponent } from './bookings-widget.component';

describe('BookingsWidgetComponent', () => {
  let component: BookingsWidgetComponent;
  let fixture: ComponentFixture<BookingsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
