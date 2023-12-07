import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-plan-interval-selector-floating',
  templateUrl: './plan-interval-selector-floating.component.html',
  styleUrls: ['./plan-interval-selector-floating.component.scss']
})
export class PlanIntervalSelectorFloatingComponent {
  @Output() intervaleSelected = new EventEmitter< 'annual' | 'monthly'>();



  setIntervalValue(interval:  'annual' | 'monthly') {
    if (interval)
      this.intervaleSelected.emit(interval)
  }
}
