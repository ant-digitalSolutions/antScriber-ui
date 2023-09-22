import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentHomeNavbarComponent } from './document-home-navbar.component';

describe('DocumentHomeNavbarComponent', () => {
  let component: DocumentHomeNavbarComponent;
  let fixture: ComponentFixture<DocumentHomeNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentHomeNavbarComponent]
    });
    fixture = TestBed.createComponent(DocumentHomeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
