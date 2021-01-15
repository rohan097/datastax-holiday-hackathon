package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.core.PagingIterable;
import com.datastax.oss.driver.api.mapper.annotations.Dao;
import com.datastax.oss.driver.api.mapper.annotations.Insert;
import com.datastax.oss.driver.api.mapper.annotations.Query;
import com.datastax.oss.driver.api.mapper.annotations.Select;
import com.rohan.hackathon.datastax.backend.model.Post;

import java.util.Optional;
import java.util.UUID;

@Dao
public interface ContentDao {

    @Query("select * from POSTS")
    PagingIterable<Post> getAll();

    @Select(customWhereClause = "USER_ID = :userId AND POST_ID = :postId")
    Optional<Post> findById(UUID userId, UUID postId);

    @Insert(ifNotExists = true)
    Boolean save(Post post);
}
