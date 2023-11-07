import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user/services/user.service';
@Component({
  selector: 'app-user-settings-change-password',
  templateUrl: './user-settings-change-password.component.html',
  styleUrls: ['./user-settings-change-password.component.scss']
})
export class UserSettingsChangePasswordComponent {

  hideCurrentPass = true;

  hideNewPass = true;

  hideConfirmationPass = true;

  passForm: FormGroup;

  isLoading = false;

  hasPassword = true;

  dataReady = false;


  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private location: Location,
    private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    // this.setForm();

    this._userService.userHasPassword().subscribe(r => {
      if (r.success) {
        this.hasPassword = r.data!;

        this.setForm()
      }
    })
  }

  setForm() {
    const regex = RegExp("(?=.*?[0-9])(?=.*?[#?!@$%^&*-])")
    this.passForm = this._formBuilder.group({
      // currentPassword: ['', [Validators.required]],
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(regex)]),
      newPasswordConfirmation: ['', [Validators.required]],

      role: ['']
    });

    if (this.hasPassword) {
      this.passForm.addControl('currentPassword', new FormControl('', [Validators.required]))
    }

    this.passForm.addValidators(this.passMatchValidator(this.passForm.get('newPassword')!, this.passForm.get('newPasswordConfirmation')!))

    this.dataReady = true;
  }

  goBack(): void {
    this.location.back();
  }

  updatePassword() {
    if (this.passForm.invalid) {
      return false;
    }

    const values = this.passForm.value;
    this._userService.updatePassword(values).subscribe(r => {
      if (r.success) {
        this._snackBar.open(`Password Updated Successfully.`, undefined, {
          duration: 2000,
          panelClass: 'snack-success'
        });
        this.goBack();
      } else {
        this._snackBar.open(`Error updating the password. Check the current Password`, undefined, {
          duration: 2000,
          panelClass: 'snack-error'
        });
      }
    })

    return true;
  }

  passMatchValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Passwords does not match' };
      return null;
    };

  }

  public get bigScreen(): boolean {
    return (window.innerWidth > 1200);
  }

  public get passMatchError(): boolean {
    return this.passForm.errors &&
      this.passForm.errors['match_error'] &&
      this.passForm.get('newPassword')!.value &&
      this.passForm.get('newPasswordConfirmation')!.valid;
  }

  get f() {
    return this.passForm.controls;
  }
}