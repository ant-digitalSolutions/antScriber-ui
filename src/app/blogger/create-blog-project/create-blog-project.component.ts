import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { BloggerService } from '../blogger.service';
import { BlogProjectCreateDto } from '../dto/blog-project-create.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog-project',
  templateUrl: './create-blog-project.component.html',
  styleUrls: ['./create-blog-project.component.scss']
})
export class CreateBlogProjectComponent {

  constructor(private bloggerService: BloggerService, private router: Router) {
  }

  isLoading = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required()),
    url: new FormControl('', Validators.required()),
    description: new FormControl('', [Validators.required(), Validators.minLength(160)]),
    userName: new FormControl('digital@antCreativeSolutions.com'),
    applicationPassword: new FormControl(''),
  })

  createBlogProject() {
    const blogProject = new BlogProjectCreateDto(this.form.value as any);
    this.bloggerService.createBlogProject(blogProject).subscribe(result => {
      console.log(result);
      this.router.navigate(['/blogger/projects/list']);
    })
  }
}
