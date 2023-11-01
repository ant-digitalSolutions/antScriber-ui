import { ComponentFixture, TestBed } from '@angular/core/testing';

import { walkthroughTourComponent } from './walkthrough-tour.component';

describe('walkthroughTourComponent', () => {
  let component: walkthroughTourComponent;
  let fixture: ComponentFixture<walkthroughTourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [walkthroughTourComponent]
    });
    fixture = TestBed.createComponent(walkthroughTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
