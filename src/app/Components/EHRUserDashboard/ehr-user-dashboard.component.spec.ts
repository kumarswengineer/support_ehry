import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EhrUserDashboardComponent } from './ehr-user-dashboard.component';

describe('EhrUserDashboardComponent', () => {
  let component: EhrUserDashboardComponent;
  let fixture: ComponentFixture<EhrUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EhrUserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
