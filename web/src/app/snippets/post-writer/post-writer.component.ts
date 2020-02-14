import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-post-writer',
  templateUrl: './post-writer.component.html',
  styleUrls: ['./post-writer.component.sass']
})
export class PostWriterComponent implements OnInit {

  @ViewChild('post') post: ElementRef;
  status = '';

  constructor(private backend: BackendService) {
  }

  ngOnInit(): void {
  }

  createPost() {
    const post = {post: {text: this.post.nativeElement.value, parent: ''}};
    this.backend.post('https://api.vobe.io/api/post/create', post).subscribe(
      data => this.status = JSON.parse(data).message
    );
  }

}
