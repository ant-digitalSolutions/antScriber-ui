import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogProjectCreateDto } from '../dto/blog-project-create.dto';
import { BlogProjectDetailsDto } from '../dto/blog-project-details.dto';

@Injectable({
  providedIn: 'root'
})
export class BlogProjectsService {


  baseUrl = environment.apiUrl;

  private _blogProjects = new BehaviorSubject<BlogProjectDetailsDto[]>([]);
  blogProjects$ = this._blogProjects.asObservable();

  private _selectedProjectId = new  BehaviorSubject<number>(-1);
  selectedProjectId$ = this._selectedProjectId.asObservable();

  public get selectedProjectId(): number {
    return this._selectedProjectId.value;
  }

  public set selectedProject(v: number) {
    this._selectedProjectId.next(v);
  }

  constructor(private http: HttpClient) {
    this.listBlogProjects();
  }

  createBlogProject(blogProject: BlogProjectCreateDto) {
    return this.http.post<BlogProjectCreateDto>(this.baseUrl + 'blogger/blog-projects', blogProject);
  }

  listBlogProjects(): Promise<BlogProjectDetailsDto[]> {
    return new Promise((resolve, reject) => {
      this.http.get<BlogProjectDetailsDto[]>(this.baseUrl + 'blogger/blog-projects')
        .pipe(tap(result => {
          this._blogProjects.next(result);
          if (this._selectedProjectId.getValue() === -1 ) {
            const defaultProjectId = result.filter(p => p.isDefaultProject)[0].id;
            this._selectedProjectId.next(defaultProjectId)
          }
        }))
        .subscribe({
          next: (projects) => {
            resolve(projects);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }
}
