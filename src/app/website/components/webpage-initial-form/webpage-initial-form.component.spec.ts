import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageInitialFormComponent } from './webpage-initial-form.component';

describe('WebpageInitialFormComponent', () => {
  let component: WebpageInitialFormComponent;
  let fixture: ComponentFixture<WebpageInitialFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebpageInitialFormComponent]
    });
    fixture = TestBed.createComponent(WebpageInitialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
