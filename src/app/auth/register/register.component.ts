import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: any = {};
  userData: any = {};
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //constructor
  constructor(
    public api: ApiService,
    public router: Router,
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public snack: MatSnackBar
  ) {}
  //fungsi inisial, dijalankan ketika class ini dipanggil
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.userData = user;
    });
  }

  hide: boolean = true;

  //fungsi mendaftarkan email dan password
  loading: boolean | undefined;
  register() {
    this.loading = true;
    this.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        this.loading = false;
        this.setData(res.user);
        this.snack.open('Selamat akun anda berhasil dibuat', 'close', {
          verticalPosition: this.verticalPosition,
        });
      })
      .catch((err) => {
        this.loading = false;
        this.snack.open('Maaf akun anda gagal didaftarkan', 'close', {
          verticalPosition: this.verticalPosition,
        });
        console.log(err);
      });
  }

  //fungsi menambahkan data username, email, password ke database
  setData(user: any) {
    this.afs
      .collection('user')
      .add({
        email: this.user.email,
        password: this.user.password,
        username: this.user.username,
      })
      .then((res) => {
        console.log('data berhasil ditambahkan');
      })
      .catch((err) => {
        console.log('gagal menambahkan data');
        console.log(err);
      });
  }
}
