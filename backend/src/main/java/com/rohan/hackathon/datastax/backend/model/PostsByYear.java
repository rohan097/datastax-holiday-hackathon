package com.rohan.hackathon.datastax.backend.model;

import com.datastax.oss.driver.api.mapper.annotations.ClusteringColumn;
import com.datastax.oss.driver.api.mapper.annotations.CqlName;
import com.datastax.oss.driver.api.mapper.annotations.Entity;
import com.datastax.oss.driver.api.mapper.annotations.PartitionKey;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/*
 * This entity complements the Post entity. This is user
 * for sorting by date, so that the most recent posts for a
 * given year can be displayed in the UI.
 * */
@Entity
@CqlName("POSTS_BY_YEAR")
public class PostsByYear {

    private UUID userId;
    private UUID postId = UUID.randomUUID();
    private String title;
    private String content;
    @ClusteringColumn
    private Instant createdAt = Instant.now();
    @PartitionKey
    private Integer year = LocalDate.now().getYear();

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getPostId() {
        return postId;
    }

    public void setPostId(UUID postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "Post{" +
                "title='" + title + '\'' +
                '}';
    }
}
