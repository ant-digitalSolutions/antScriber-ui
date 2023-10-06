import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWizardComponent } from './layout-wizard/layout-wizard.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgScrollbarModule,
     TablerIconsModule,
     FormsModule
  ]
})
export class LayoutsModule { }
