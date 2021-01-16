package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.core.PagingIterable;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.mapper.annotations.*;
import com.rohan.hackathon.datastax.backend.model.Post;
import com.rohan.hackathon.datastax.backend.model.PostsByYear;

import java.util.Optional;
import java.util.UUID;

@Dao
public interface ContentDao {

    @Query("SELECT DISTINCT YEAR FROM POSTS_BY_YEAR")
    ResultSet getDistinctYears();

    @Query("select * from POSTS_BY_YEAR WHERE YEAR = :year")
    PagingIterable<PostsByYear> getAllPostsByYear(Integer year);

    @Select(customWhereClause = "USER_ID = :userId AND POST_ID = :postId")
    Optional<Post> findById(UUID userId, UUID postId);

    @Insert(ifNotExists = true)
    Boolean save(Post post);

    @Insert(ifNotExists = true)
    Boolean save(PostsByYear post);

    @Delete
    Boolean delete(Post post);
}
