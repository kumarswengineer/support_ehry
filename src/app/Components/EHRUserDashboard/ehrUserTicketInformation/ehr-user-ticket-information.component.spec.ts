import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EhrUserTicketInformationComponent } from './ehr-user-ticket-information.component';

describe('EhrUserTicketInformationComponent', () => {
  let component: EhrUserTicketInformationComponent;
  let fixture: ComponentFixture<EhrUserTicketInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EhrUserTicketInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrUserTicketInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
