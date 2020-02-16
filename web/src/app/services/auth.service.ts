import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private backend: BackendService) {
  }

  auth() {
    this.backend.post('/api/auth/auth', null).subscribe(res => {
      this.user = res.data;
    });
  }

  logout() {
    this.backend.post('/api/auth/logout', null).subscribe(res => {
      this.user = '';
    });
  }
}
