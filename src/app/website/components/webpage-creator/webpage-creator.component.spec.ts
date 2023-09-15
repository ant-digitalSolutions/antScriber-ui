import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageCreatorComponent } from './webpage-creator.component';

describe('WebpageCreatorComponent', () => {
  let component: WebpageCreatorComponent;
  let fixture: ComponentFixture<WebpageCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebpageCreatorComponent]
    });
    fixture = TestBed.createComponent(WebpageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
