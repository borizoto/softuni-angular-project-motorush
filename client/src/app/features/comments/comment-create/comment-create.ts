import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommentsService } from '../../../core/services/comments.service';
import { CommentModel } from '../../../models/comment.model';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.css'
})
export class CommentCreate {
  @Output() commentCreated = new EventEmitter<CommentModel>();

  listingId!: string;
  username!: string;
  comment: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentsService
  ) {
    this.listingId = this.route.snapshot.paramMap.get('listingId')!;
    this.username = this.authService.currentUser()?.username ?? 'Anonymous';
  }

  async onSubmit() {
    if (!this.comment.trim()) return;

    try {
      const newComment = await firstValueFrom(
        this.commentService.create(this.comment, this.listingId, this.username)
      );

      this.commentCreated.emit(newComment);
      this.comment = '';
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  }
}
