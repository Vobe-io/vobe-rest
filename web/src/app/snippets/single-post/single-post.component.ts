import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.sass']
})
export class SinglePostComponent implements OnInit {

  @Input() post: any;
  date: string;

  constructor() { }

  ngOnInit(): void {
    this.date = moment(new Date(this.post.date)).fromNow();
  }
}
