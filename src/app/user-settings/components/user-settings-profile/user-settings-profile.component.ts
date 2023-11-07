import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-user-settings-profile',
  templateUrl: './user-settings-profile.component.html',
  styleUrls: ['./user-settings-profile.component.scss']
})
export class UserSettingsProfileComponent implements OnInit {

  isLoading = false;



  hidePass = true;

  profileForm: FormGroup;

  userData: any;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.profileForm = this._formBuilder.group({
      firstName: [this._userService.userDisplayName, [Validators.required]],
      lastName: [this._userService.userDisplayName, [Validators.required]],
      email: { value: this._userService.userEmail, disabled: true },
      company: ['', [Validators.maxLength(100), Validators.minLength(3)]],
      role: ['']
    });
    // this.profileForm = new FormGroup({
    //   fullName: new FormControl(this._userService.userDisplayName, [Validators.required]),
    //   email: new FormControl(this._userService.userEmail, [Validators.required, Validators.email],),
    //   company: new FormControl('', [Validators.maxLength(100), Validators.minLength(3)]),
    //   role: new FormControl('')
    // })
  }

  changePass() {
    this._router.navigate(['password'], { relativeTo: this._route })
  }

  updateProfile() {
    throw new Error('Method not implemented.');
  }

}
