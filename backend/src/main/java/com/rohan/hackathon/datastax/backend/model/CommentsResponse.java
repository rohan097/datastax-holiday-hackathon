package com.rohan.hackathon.datastax.backend.model;

import java.util.ArrayList;
import java.util.List;

public class CommentsResponse extends Comment {

    private List<Comment> children;
    private String date;

    public CommentsResponse(Comment comment) {
        super(comment);
        this.children = new ArrayList<>();
    }

    public List<Comment> getChildren() {
        return children;
    }

    public void addChild(Comment child) {
        this.children.add(child);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
