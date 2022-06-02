import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedWebinarComponent } from './detailed-webinar.component';

describe('DetailedWebinarComponent', () => {
  let component: DetailedWebinarComponent;
  let fixture: ComponentFixture<DetailedWebinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedWebinarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
