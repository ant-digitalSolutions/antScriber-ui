import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuItemsComponent } from './header-menu-items.component';

describe('HeaderMenuItemsComponent', () => {
  let component: HeaderMenuItemsComponent;
  let fixture: ComponentFixture<HeaderMenuItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuItemsComponent]
    });
    fixture = TestBed.createComponent(HeaderMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
