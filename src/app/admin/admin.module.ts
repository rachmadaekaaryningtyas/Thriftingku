import { DeleteItemComponent } from './delete-item/delete-item.component';
import { TambahItemComponent } from './tambah-item/tambah-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { FormsModule } from '@angular/forms';
import { KontakComponent } from './kontak/kontak.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { CatalogComponent } from './catalog/catalog.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/admin/catalog',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    KontakComponent,
    TambahItemComponent,
    DetailItemComponent,
    DeleteItemComponent,
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule,
  ],
})
export class AdminModule {}
