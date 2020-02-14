import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input() post: any;
  date: string;

  constructor() { }

  ngOnInit(): void {
    this.date = moment(new Date(this.post.date)).fromNow();
  }

}
