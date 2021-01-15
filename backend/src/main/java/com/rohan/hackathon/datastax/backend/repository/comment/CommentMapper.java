package com.rohan.hackathon.datastax.backend.repository.comment;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.mapper.annotations.DaoFactory;
import com.datastax.oss.driver.api.mapper.annotations.DaoKeyspace;
import com.datastax.oss.driver.api.mapper.annotations.Mapper;

@Mapper
public interface CommentMapper {
    @DaoFactory
    CommentDao commentDao(@DaoKeyspace CqlIdentifier cqlIdentifier);
}
