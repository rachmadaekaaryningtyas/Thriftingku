import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Item {
  idItem: string;
  merk: string;
  ukuran: string;
  minus: string;
  harga: string;
  lokasi: string;
  penjual: string;
}

@Component({
  selector: 'app-tambah-item',
  templateUrl: './tambah-item.component.html',
  styleUrls: ['./tambah-item.component.scss'],
})
export class TambahItemComponent implements OnInit {
  userData: any = {};
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user: any = {};
  constructor(
    public dialogRef: MatDialogRef<TambahItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((res) => {
      this.userData = res;
    });
  }

  // Fungsi untuk menyimpan data yang telah diinput
  simpan() {
    if (this.data.id == undefined) {
      const doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.afs
        .collection('catalog')
        .doc(doc)
        .set(this.data)
        .then((res) => {
          this.snackbar.open(
            'Selamat catalog berhasil ditambahkan!',
            'close',
            {
              verticalPosition: this.verticalPosition,
            }
          );
        })
        .catch((err) => {
          this.snackbar.open('Catalog gagal ditambahkan', 'close', {
            verticalPosition: this.verticalPosition,
          });
          console.log(err);
        });
    } else {
      // Fungsi untuk melakukan perubahan data
      const doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.afs
        .collection('catalog')
        .doc(this.data.id)
        .update(this.data)
        .then((res) => {
          this.snackbar.open('Catalog berhasil diubah!', 'close', {
            verticalPosition: this.verticalPosition,
          });
        })
        .catch((err) => {
          console.log(err);
          this.snackbar.open('Catalog gagal diubah!', 'close', {
            verticalPosition: this.verticalPosition,
          });
        });
    }
  }
}
