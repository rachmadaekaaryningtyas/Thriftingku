import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  userData: any = {};
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public api: ApiService,
    public router: Router,
    public auth: AngularFireAuth,
    public snack: MatSnackBar,
    public db: AngularFirestore
  ) {}

  ngOnInit(): void {}

  // Fungsi untuk mengecek apakah email dan password telah terdaftar pada database
  login() {
    this.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        this.router.navigate(['admin/catalog']);
      })
      .catch((err) => {
        this.snack.open('Terdapat kesalahan, silahkan dicek lagi', 'close', {
          verticalPosition: this.verticalPosition,
        });
        console.log(err);
      });
  }
}
