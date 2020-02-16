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
    this.route.params.subscribe(data => this.loadProfile(data.username));
  }

  loadProfile(user) {
    const profileData = {
      username: user
    };
    this.backend.post('/api/profile', profileData).subscribe(res => {
        console.log(res);
        this.profile = res.data;
      }
    );
  }
}
