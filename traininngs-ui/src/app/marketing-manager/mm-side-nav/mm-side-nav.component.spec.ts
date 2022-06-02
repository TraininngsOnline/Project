import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmSideNavComponent } from './mm-side-nav.component';

describe('MmSideNavComponent', () => {
  let component: MmSideNavComponent;
  let fixture: ComponentFixture<MmSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
