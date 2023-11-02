import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectDetailsDto } from '../dto/blog-project-details.dto';
import { BlogProjectsService } from '../services/blog-projects.service';

@Component({
  selector: 'app-list-blog-projects',
  templateUrl: './list-blog-projects.component.html',
  styleUrls: ['./list-blog-projects.component.scss']
})
export class ListBlogProjectsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()

  blogProjects: BlogProjectDetailsDto[];
  constructor(private blogProjectsService: BlogProjectsService) {

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
