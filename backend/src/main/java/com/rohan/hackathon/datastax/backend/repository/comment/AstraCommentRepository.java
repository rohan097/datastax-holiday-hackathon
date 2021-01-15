package com.rohan.hackathon.datastax.backend.repository.comment;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.PagingIterable;
import com.rohan.hackathon.datastax.backend.model.Comment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class AstraCommentRepository implements CommentRepository {

    private final CommentDao commentDao;

    public AstraCommentRepository(final CqlSession cqlSession) {
        CommentMapper commentMapper = new CommentMapperBuilder(cqlSession).build();
        this.commentDao = commentMapper.commentDao(CqlIdentifier.fromCql("application"));
    }

    @Override
    public List<Comment> getCommentsByPostId(UUID postId) {
        PagingIterable<Comment> commentsIterable = commentDao.findCommentsByPostId(postId);
        return commentsIterable.all();
    }

    @Override
    public Boolean save(Comment comment) {
        return commentDao.saveComment(comment);
    }

    @Override
    public Boolean delete(UUID postId, UUID commentId) {
        return commentDao.deleteComment(postId, commentId);
    }
}
