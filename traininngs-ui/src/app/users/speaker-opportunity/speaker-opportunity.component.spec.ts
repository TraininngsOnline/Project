import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerOpportunityComponent } from './speaker-opportunity.component';

describe('SpeakerOpportunityComponent', () => {
  let component: SpeakerOpportunityComponent;
  let fixture: ComponentFixture<SpeakerOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
