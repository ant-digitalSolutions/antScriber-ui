import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageRenderComponent } from './webpage-render.component';

describe('WebpageRenderComponent', () => {
  let component: WebpageRenderComponent;
  let fixture: ComponentFixture<WebpageRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebpageRenderComponent]
    });
    fixture = TestBed.createComponent(WebpageRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
