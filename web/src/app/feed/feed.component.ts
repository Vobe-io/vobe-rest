import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services/backend.service';
import {Post} from '../snippets/post/Post';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  posts: any[] = [];

  constructor(private backend: BackendService, private auth: AuthService) { }

  ngOnInit(): void {
    this.loadFeed();
  }

  private loadFeed() {
    this.backend.post('/', null).subscribe(res => {
      const posts = JSON.parse(res).posts;
      posts.map(post => this.posts.push(post));
    });
  }
}
