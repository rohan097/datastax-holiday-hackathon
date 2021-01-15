package com.rohan.hackathon.datastax.backend.repository.comment;

import com.datastax.oss.driver.api.core.PagingIterable;
import com.datastax.oss.driver.api.mapper.annotations.Dao;
import com.datastax.oss.driver.api.mapper.annotations.Delete;
import com.datastax.oss.driver.api.mapper.annotations.Insert;
import com.datastax.oss.driver.api.mapper.annotations.Select;
import com.rohan.hackathon.datastax.backend.model.Comment;

import java.util.UUID;

@Dao
public interface CommentDao {

    @Select(customWhereClause = "POST_ID = :postId")
    PagingIterable<Comment> findCommentsByPostId(UUID postId);

    @Insert
    Boolean saveComment(Comment comment);

    @Delete(customWhereClause = "POST_ID = :postId AND COMMENT_ID = :commentId", entityClass = Comment.class)
    Boolean deleteComment(UUID postId, UUID commentId);
}
