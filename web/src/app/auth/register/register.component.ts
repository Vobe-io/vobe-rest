import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  @ViewChild('email') email: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(private backend: BackendService) { }

  status = '';

  ngOnInit(): void {
  }

  register() {
    const registerData = {
      email: this.email.nativeElement.value,
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    };

    this.backend.post('/api/auth/register', registerData).subscribe(
      data => this.status = data.message,
      err => this.status = err.error.message
    );
  }
}
