import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-plan-interval-selector',
  templateUrl: './plan-interval-selector.component.html',
  styleUrls: ['./plan-interval-selector.component.scss'],
})
export class PlanIntervalSelectorComponent {
  @Output() intervaleSelected = new EventEmitter< 'annual' | 'monthly'>();

  setIntervalValue(interval:  'annual' | 'monthly') {
    if (interval)
      this.intervaleSelected.emit(interval)
  }
}
