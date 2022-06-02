import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarTypeListComponent } from './webinar-type-list.component';

describe('WebinarTypeListComponent', () => {
  let component: WebinarTypeListComponent;
  let fixture: ComponentFixture<WebinarTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
