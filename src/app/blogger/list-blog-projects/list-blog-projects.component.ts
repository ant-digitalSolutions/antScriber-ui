import { Component, OnDestroy, OnInit } from '@angular/core';
import { BloggerService } from '../blogger.service';
import { BlogProjectDetailsDto } from '../dto/blog-project-details.dto';
import { BlogProjectsService } from '../services/blog-projects.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-blog-projects',
  templateUrl: './list-blog-projects.component.html',
  styleUrls: ['./list-blog-projects.component.scss']
})
export class ListBlogProjectsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  
  blogProjects: BlogProjectDetailsDto[];
  constructor(private bloggerService: BloggerService, private blogProjectsService: BlogProjectsService) {
    
  }
  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this.blogProjectsService.blogProjects$.pipe(takeUntil(this.componentDestroyed$)).subscribe(result => {
      this.blogProjects = result;
    })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
