import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserProfileDto } from 'src/app/user/dto/user-profile.dto';
import { UserService } from 'src/app/user/services/user.service';
import { IUserUpdateDto } from '../../dtos/user-update.dto';

@Component({
  selector: 'app-user-settings-profile',
  templateUrl: './user-settings-profile.component.html',
  styleUrls: ['./user-settings-profile.component.scss']
})
export class UserSettingsProfileComponent implements OnInit {

  isLoading = false;

  // indicate if the data is ready and the 
  // form can be rendered
  dataReady = false;


  hidePass = true;

  profileForm: FormGroup;

  userData: any;

  userProfile: IUserProfileDto;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    this._userService.getProfile().subscribe(r => {
      if (r.success) {
        this.userProfile = r.data!;

        this.setForm();
        this.dataReady = true;
      }
    })
  }

  setForm() {
    this.profileForm = this._formBuilder.group({
      firstName: [this.userProfile.firstName, [Validators.required]],
      lastName: [this.userProfile.lastName, [Validators.required]],
      email: { value: this.userProfile.email, disabled: true },
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
    if (this.profileForm.invalid) {
      return false;
    }

    const userData: IUserUpdateDto = this.profileForm.value;

    this._userService.updateProfile(userData).subscribe(r => {
      if (r.success) {
        this._snackBar.open(`Profile Updated Successfully.`, undefined, {
          duration: 2000,
          panelClass: 'snack-success'
        });
      } else {
        this._snackBar.open(`Error updating the profile.`, undefined, {
          duration: 2000,
          panelClass: 'snack-error'
        });
      }
    })

    return true;
  }

}
