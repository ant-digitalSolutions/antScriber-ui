import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ContentCreationService } from './content-creation.service';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ContentCreationService]
})
export class ContentCreationModule { }
