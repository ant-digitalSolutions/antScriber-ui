import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  options = this.settings.getOptions();

  form: FormGroup;

  constructor(
    private settings: CoreService, 
    private router: Router,
    private _authService: AuthService) { }
  
  
    ngOnInit(): void {
      this.initForm();
  }

    initForm(){
      this.form = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        registerCode: new FormControl('', Validators.required)
      });
    }


  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this._authService.register(this.form.value).subscribe(r => {
        if (r.success) {
          this.router.navigate(['/wizard/creator']);
        }
      })
    }
   
  }
}
