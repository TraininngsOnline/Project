import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingWebinarsComponent } from './upcoming-webinars.component';

describe('UpcomingWebinarsComponent', () => {
  let component: UpcomingWebinarsComponent;
  let fixture: ComponentFixture<UpcomingWebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingWebinarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
