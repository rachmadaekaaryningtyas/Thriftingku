import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  user: any = {};
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public auth: AngularFireAuth, public snack: MatSnackBar) {}

  ngOnInit(): void {}

  // Fungsi untuk mengirimkan email yang berisi perubahan kata sandi
  forgetPassword() {
    this.auth
      .sendPasswordResetEmail(this.user.email)
      .then((res) => {
        this.snack.open('Silahkan cek email anda', 'close', {
          verticalPosition: this.verticalPosition,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
