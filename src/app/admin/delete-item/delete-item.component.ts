import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DeleteItemComponent>) {}

  ngOnInit(): void {}

  //Membuat Fungsi Konfirmasi Delete Produk:
  konfirmasiDelete() {
    this.dialogRef.close(true);
  }
}
