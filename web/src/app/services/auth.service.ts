import { Injectable } from '@angular/core';
import {BackendService} from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private backend: BackendService) { }

  auth() {
    this.backend.post('https://api.vobe.io/api/auth/auth', null).subscribe(res => {
      this.user = JSON.parse(res).user;
    });
  }

  logout() {
    this.backend.post('https://api.vobe.io/api/auth/logout', null).subscribe(res => {
      this.user = null;
    });
  }
}
