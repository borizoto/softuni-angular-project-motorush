import { Component, Input } from '@angular/core';
import { CommentModel } from '../../../models/comment.model';

@Component({
  selector: 'app-comment-section',
  imports: [],
  templateUrl: './comment-section.html',
  styleUrl: './comment-section.css'
})
export class CommentSection {
  @Input() comments: CommentModel[] = [];
}
