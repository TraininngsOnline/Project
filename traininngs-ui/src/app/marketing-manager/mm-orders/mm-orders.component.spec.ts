import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmOrdersComponent } from './mm-orders.component';

describe('MmOrdersComponent', () => {
  let component: MmOrdersComponent;
  let fixture: ComponentFixture<MmOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
