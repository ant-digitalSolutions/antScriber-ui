import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogProjectCreateDto } from '../dto/blog-project-create.dto';
import { BlogProjectDetailsDto } from '../dto/blog-project-details.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic'
import { relativeTimeThreshold } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BlogProjectsService {


  baseUrl = getBaseApiURL();

  private _blogProjects = new BehaviorSubject<BlogProjectDetailsDto[]>([]);
  blogProjects$ = this._blogProjects.asObservable();

  private _selectedProjectId = new  BehaviorSubject<number>(-1);
  selectedProjectId$ = this._selectedProjectId.asObservable();

  // emits to indicate we should load the projects and set the default project
  // private _refreshProjectsSubject = new BehaviorSubject<void>(undefined);
  // refreshProjects$ = this._refreshProjectsSubject.asObservable();


  public get selectedProjectId(): number {
    return this._selectedProjectId.value;
  }

  public set selectedProjectId(v: number) {
    this._selectedProjectId.next(v);
  }

  constructor(private http: HttpClient) {
    // this.listBlogProjects();

    // this._refreshProjectsSubject.subscribe(() => this.listBlogProjects())
  }

  createBlogProject(blogProject: BlogProjectCreateDto) {
    return this.http.post<BlogProjectCreateDto>(this.baseUrl + 'blogger/blog-projects', blogProject);
  }

  listBlogProjects(): Promise<BlogProjectDetailsDto[]> {
    return new Promise((resolve, reject) => {
      this.http.get<BlogProjectDetailsDto[]>(this.baseUrl + 'blogger/blog-projects')
        .pipe(tap(result => {
          this._blogProjects.next(result);
          // if (this._selectedProjectId.getValue() === -1 ) {
            const defaultProjectId = result.filter(p => p.isDefaultProject)[0].id;

          this._selectedProjectId.next(defaultProjectId)
          // }
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

  refreshProjects() {
    return this.listBlogProjects();
  }

  

  /**
   * Returns the blog project data with the given ID.
   *
   * @param {number} blogProjectId
   * @return {*}  {(BlogProjectDetailsDto | undefined)}
   * @memberof BlogProjectsService
   */
  getBlogProjectById(blogProjectId: number): BlogProjectDetailsDto | undefined {
    const blogProject = this._blogProjects.value.filter(p => p.id === blogProjectId);
    if (blogProject && blogProject.length === 1)
      return blogProject[0];
    return undefined;
  }
}
