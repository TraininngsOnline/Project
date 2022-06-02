import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarsListComponent } from './webinars-list.component';

describe('WebinarsListComponent', () => {
  let component: WebinarsListComponent;
  let fixture: ComponentFixture<WebinarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
