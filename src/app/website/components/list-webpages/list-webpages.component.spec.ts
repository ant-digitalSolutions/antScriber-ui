import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWebpagesComponent } from './list-webpages.component';

describe('ListWebpagesComponent', () => {
  let component: ListWebpagesComponent;
  let fixture: ComponentFixture<ListWebpagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWebpagesComponent]
    });
    fixture = TestBed.createComponent(ListWebpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
