import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenVerificationComponent } from './token-verification.component';

describe('TokenVerificationComponent', () => {
  let component: TokenVerificationComponent;
  let fixture: ComponentFixture<TokenVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenVerificationComponent]
    });
    fixture = TestBed.createComponent(TokenVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
