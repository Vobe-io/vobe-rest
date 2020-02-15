import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services/backend.service';
import {ActivatedRoute} from '@angular/router';

import {Profile} from './Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile: Profile;

  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const profileData = {
      username: this.route.snapshot.paramMap.get('username')
    };
    this.backend.post('/api/profile', profileData).subscribe(res =>
      this.profile = JSON.parse(res)[0]
    );
  }
}
