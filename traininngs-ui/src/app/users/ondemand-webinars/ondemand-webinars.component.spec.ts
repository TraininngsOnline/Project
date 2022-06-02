import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndemandWebinarsComponent } from './ondemand-webinars.component';

describe('OndemandWebinarsComponent', () => {
  let component: OndemandWebinarsComponent;
  let fixture: ComponentFixture<OndemandWebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OndemandWebinarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OndemandWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
