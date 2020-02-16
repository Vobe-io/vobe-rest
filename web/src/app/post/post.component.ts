import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services/backend.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  posts: any[] = [];
  status = '';

  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost() {
    const postData = {
      postId: this.route.snapshot.paramMap.get('postID')
    };
    this.backend.post('/v', postData).subscribe(
      res => {
          if (res !== null) {
            res.data.map(post => this.posts.push(post));
          }
        },
      err => this.status = err.error.message
      );
  }
}
