import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  posts: any[] = [];

  private postSource = new BehaviorSubject<any>(null);
  newPost = this.postSource.asObservable();

  constructor() { }

  addPost(post: any) {
    this.postSource.next(post);
  }
}
