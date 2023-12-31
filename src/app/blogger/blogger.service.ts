import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { BlogProjectCreateDto } from './dto/blog-project-create.dto';
import { BlogProjectDetailsDto } from './dto/blog-project-details.dto';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  baseUrl = getBaseApiURL();

  blogProjects: BlogProjectDetailsDto[];

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  createBlogProject(blogProject: BlogProjectCreateDto) {
    return this.http.post<BlogProjectCreateDto>(this.baseUrl + 'blogger/blog-projects', blogProject);
  }

  publishArticle(articleId: number) {
    return this.http.post(this.baseUrl + 'blogger/publish-article', { articleId }).pipe(tap(() => {
      this.toastr.success('Success', 'The article was published')
    }));
  }
}
