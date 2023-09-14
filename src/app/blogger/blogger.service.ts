import { Injectable } from '@angular/core';
import { BlogProjectCreateDto } from './dto/blog-project-create.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BlogProjectDetailsDto } from './dto/blog-project-details.dto';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  baseUrl = environment.apiUrl;

  blogProjects: BlogProjectDetailsDto[];

  constructor(private http: HttpClient) { }

  createBlogProject(blogProject: BlogProjectCreateDto) {
    return this.http.post<BlogProjectCreateDto>(this.baseUrl + 'blogger/blog-projects', blogProject);
  }

  publishArticle(articleId: number) {
    return this.http.post(this.baseUrl + 'blogger/publish-article', {articleId});
  }
}
