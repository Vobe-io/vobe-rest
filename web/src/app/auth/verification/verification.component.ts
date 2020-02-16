import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.sass']
})
export class VerificationComponent implements OnInit {

  status = '';

  constructor(private route: ActivatedRoute, private backend: BackendService) {
  }

  ngOnInit(): void {
    this.verificateEmail();
  }

  verificateEmail() {
    const verificationData = {
      token: this.route.snapshot.paramMap.get('token'),
      email: this.route.snapshot.paramMap.get('email')
    };
    this.backend.post('/api/auth/verification', verificationData).subscribe(
      data => this.status = data.message,
      err => this.status = err.error.message
    );
  }
}
