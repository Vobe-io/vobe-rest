import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-post-writer',
  templateUrl: './post-writer.component.html',
  styleUrls: ['./post-writer.component.sass']
})
export class PostWriterComponent implements OnInit {

  @ViewChild('post') post: ElementRef;
  status = '';

  constructor(private backend: BackendService, private data: DataService) {
  }

  ngOnInit(): void {
  }

  handleShortcut(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.createPost();
    }
  }

  createPost() {
    const post = {post: {text: this.post.nativeElement.value, parent: ''}};
    this.backend.post('/api/post/create', post).subscribe(data => {
      const res = JSON.parse(data);
      this.data.addPost(res.message);
      // res.error === null ? this.data.addPost(res.message) : (this.status = JSON.parse(data).error);
    });
    this.post.nativeElement.value = '';
  }

}
