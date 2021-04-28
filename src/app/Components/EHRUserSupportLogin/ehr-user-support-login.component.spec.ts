import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EhrUserSupportLoginComponent } from './ehr-user-support-login.component';

describe('EhrUserSupportLoginComponent', () => {
  let component: EhrUserSupportLoginComponent;
  let fixture: ComponentFixture<EhrUserSupportLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EhrUserSupportLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrUserSupportLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
