import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  userData: any = {};
  user: any = {};
  constructor(
    public api: ApiService,
    public router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.userData = user;
    });
  }

  mode: string = 'side';

  // checkLogin()
  // {
  //   this.api.get('bookswithauth/status').subscribe(res=>{
  //     //is logged in
  //     return;
  //   },error=>{
  //     //not logged in
  //     this.router.navigate(['/login']);
  //   })
  // }

  logout() {
    let conf = confirm('Keluar Aplikasi ?');
    if (conf) {
      this.auth.signOut().then((res) => {
        this.router.navigate(['login']);
      });
    }
  }
}
