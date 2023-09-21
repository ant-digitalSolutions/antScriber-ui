import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WizardCreatorService } from '../../services/wizard-creator.service';

@Component({
  selector: 'app-wizard-creator-editor',
  templateUrl: './wizard-creator-editor.component.html',
  styleUrls: ['./wizard-creator-editor.component.scss']
})
export class WizardCreatorEditorComponent implements OnDestroy, OnInit {
updateEditedContent($event: string) {
throw new Error('Method not implemented.');
}

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  docContent = '';

  constructor(private _wizardCreatorService: WizardCreatorService, private projectService: BlogProjectsService) {

  }
  
  ngOnInit(): void {
   this.setListeners();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._wizardCreatorService.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.isLoading = false;
      if (r)
        this.docContent += r;
    })
  }
}
