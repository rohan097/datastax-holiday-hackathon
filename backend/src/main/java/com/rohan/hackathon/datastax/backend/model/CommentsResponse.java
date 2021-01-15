package com.rohan.hackathon.datastax.backend.model;

import java.util.ArrayList;
import java.util.List;

public class CommentsResponse extends Comment {

    List<Comment> children;

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
}
