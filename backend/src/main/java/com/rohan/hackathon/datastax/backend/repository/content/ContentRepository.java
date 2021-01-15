package com.rohan.hackathon.datastax.backend.repository.content;

import com.rohan.hackathon.datastax.backend.model.Post;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContentRepository {

    List<Post> getAll();

    Optional<Post> findById(UUID userId, UUID postId);

    Boolean save(Post post);
}
