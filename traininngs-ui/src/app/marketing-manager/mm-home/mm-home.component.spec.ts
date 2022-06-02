import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmHomeComponent } from './mm-home.component';

describe('MmHomeComponent', () => {
  let component: MmHomeComponent;
  let fixture: ComponentFixture<MmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
