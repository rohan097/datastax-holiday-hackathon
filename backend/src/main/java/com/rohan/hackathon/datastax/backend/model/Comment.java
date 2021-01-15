package com.rohan.hackathon.datastax.backend.model;

import com.datastax.oss.driver.api.mapper.annotations.CqlName;
import com.datastax.oss.driver.api.mapper.annotations.Entity;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

import java.time.Instant;
import java.util.UUID;

@Entity
@CqlName("comments")
public class Comment {

    @PrimaryKey
    private UUID postId;
    @PrimaryKey
    private UUID commentId = UUID.randomUUID();
    private UUID userId;
    private UUID parentId;
    private String data;
    private String username;
    private Integer upvotes;
    private Integer downvotes;

    private Instant createdAt = Instant.now();

    public Comment(Comment comment) {
        this.postId = comment.getPostId();
        this.commentId = comment.getCommentId();
        this.userId = comment.getUserId();
        this.parentId = comment.getParentId();
        this.data = comment.getData();
        this.createdAt = comment.getCreatedAt();
        this.username = comment.getUsername();
        this.upvotes = comment.upvotes;
        this.downvotes = comment.downvotes;
    }

    public Comment() {
    }

    public UUID getPostId() {
        return postId;
    }

    public void setPostId(UUID postId) {
        this.postId = postId;
    }

    public UUID getCommentId() {
        return commentId;
    }

    public void setCommentId(UUID commentId) {
        this.commentId = commentId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getParentId() {
        return parentId;
    }

    public void setParentId(UUID parentId) {
        this.parentId = parentId;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(Integer upvotes) {
        this.upvotes = upvotes;
    }

    public Integer getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(Integer downvotes) {
        this.downvotes = downvotes;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "postId=" + postId +
                ", commentId=" + commentId +
                ", parentId=" + parentId +
                ", createdAt=" + createdAt +
                '}';
    }
}
