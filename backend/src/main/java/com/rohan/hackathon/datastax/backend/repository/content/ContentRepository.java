package com.rohan.hackathon.datastax.backend.repository.content;

import com.rohan.hackathon.datastax.backend.model.Post;
import com.rohan.hackathon.datastax.backend.model.PostsByYear;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContentRepository {

    List<Integer> getDistinctYears();

    List<PostsByYear> getAllPostsByYear(Integer year);

    Optional<Post> findById(UUID userId, UUID postId);

    Boolean save(Post post);

    Boolean save(PostsByYear postsByYear);

    Boolean delete(Post post);
}
