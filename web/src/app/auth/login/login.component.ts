import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(public auth: AuthService, private backend: BackendService) { }

  ngOnInit(): void {
  }

  login() {
    const loginData = {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    };

    this.backend.post('https://vobe.io/api/auth/login', loginData).subscribe(res => {
      this.auth.auth();
    });
  }

}
