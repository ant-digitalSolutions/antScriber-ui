import { Component, OnInit } from '@angular/core';
import { BloggerService } from '../blogger.service';
import { BlogProjectDetailsDto } from '../dto/blog-project-details.dto';

@Component({
  selector: 'app-list-blog-projects',
  templateUrl: './list-blog-projects.component.html',
  styleUrls: ['./list-blog-projects.component.scss']
})
export class ListBlogProjectsComponent implements OnInit {
  blogProjects: BlogProjectDetailsDto[];
  constructor(private bloggerService: BloggerService) {
    
  }
  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this.bloggerService.listBlogProjects().subscribe(result => {
      this.blogProjects = result;
    })
  }
}
