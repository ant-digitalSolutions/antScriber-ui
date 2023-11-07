import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _userService: UserService) {

  }


  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.profileForm = new FormGroup({
      fullName: new FormControl(this._userService.userDisplayName, [Validators.required]),
      email: new FormControl(this._userService.userEmail, [Validators.required, Validators.email]),
      company: new FormControl('', [Validators.maxLength(100), Validators.minLength(3)]),
      role: new FormControl('')
    })
  }

  updateProfile() {
    throw new Error('Method not implemented.');
  }

}
