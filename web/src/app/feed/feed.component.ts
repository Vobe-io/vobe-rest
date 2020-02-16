import {Component, OnInit} from '@angular/core';
import {BackendService} from '../services/backend.service';
import {feedAnimation} from './feed-animation';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
  animations: [feedAnimation]
})
export class FeedComponent implements OnInit {

  constructor(private backend: BackendService, public data: DataService) { }

  ngOnInit(): void {
    if (this.data.posts.length === 0) {
      this.loadFeed();
    }
  }

  private loadFeed() {
    this.backend.get('/api/post/get', null).subscribe((res) => {
      res.data.map(post => {
        this.data.posts.push(post);
      });
      this.data.newPost.subscribe(post => {
        if (post !== null) {
          this.data.posts.unshift(post);
        }
      });
    }, (err) => null);
  }
}
