import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySmsCodeComponent } from './security-sms-code.component';

describe('SecuritySmsCodeComponent', () => {
  let component: SecuritySmsCodeComponent;
  let fixture: ComponentFixture<SecuritySmsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritySmsCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuritySmsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
