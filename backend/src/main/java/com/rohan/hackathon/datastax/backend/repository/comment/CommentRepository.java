package com.rohan.hackathon.datastax.backend.repository.comment;

import com.rohan.hackathon.datastax.backend.model.Comment;

import java.util.List;
import java.util.UUID;

public interface CommentRepository {

    List<Comment> getCommentsByPostId(UUID postId);

    Boolean save(Comment comment);

    Boolean delete(UUID postId, UUID commentId);
}
