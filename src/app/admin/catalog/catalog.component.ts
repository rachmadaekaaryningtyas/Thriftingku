import { Component, OnInit } from '@angular/core';
import { DeleteItemComponent } from './../delete-item/delete-item.component';
import { DetailItemComponent } from './../detail-item/detail-item.component';
import { TambahItemComponent } from './../tambah-item/tambah-item.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  catalog: any = {};
  catalogs: any = [];
  userData: any = {};
  user: any = {};
  idx: any;
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    public db: AngularFirestore,
    public sb: MatSnackBar
  ) {}

  // fungsi untuk inisialisasi user
  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.userData = user;
      this.getItem();
    });
  }

  // Fungsi untuk mengambil semua data yang ada di collection catalog
  getItem() {
    this.db
      .collection('catalog', (ref) => {
        return ref.where('uid', '==', this.userData.uid);
      })
      .valueChanges({ idField: 'id' })
      .subscribe(
        (res) => {
          console.log(res);
          this.catalogs = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // Fungsi untuk menambahkan catalog baru
  tambahItem(data: any, idx: any) {
    let dialog = this.dialog.open(TambahItemComponent, {
      width: '450px',
      data: data,
    });
  }

  // Fungsi untuk melihat data bedasarkan id yang dipilih
  detailItem(data: any, idx: any) {
    let dialog = this.dialog.open(DetailItemComponent, {
      width: '450px',
      data: data,
    });

    dialog.afterClosed().subscribe((res) => {
      console.log('card ditutup');
    });
  }

  // fungsi untuk menghapus data catalog
  deleteItem(catalogs: any, idx: any) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.db
          .collection('catalog')
          .doc(catalogs.id)
          .delete()
          .then((res) => {
            this.sb.open('Catalog berhasil dihapus', 'close', {
              verticalPosition: this.verticalPosition,
            });
          })
          .catch((err) => {
            this.sb.open(
              'Silahkan coba lagi, Catalog tidak dapat dihapus',
              'close',
              {
                verticalPosition: this.verticalPosition,
              }
            );
          });
      }
    });
  }
}
