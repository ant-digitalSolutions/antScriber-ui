import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ContentCreationService } from './content-creation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { ContentCreationRoutes } from './content.routing';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ArticleModule } from './article/article.module';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ContentCreationRoutes),
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    TablerIconsModule.pick(TablerIcons),
    ReactiveFormsModule,
    ArticleModule
  ],
  providers: [ContentCreationService],
  exports: [ChatComponent]
})
export class ContentCreationModule { }
