package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.mapper.annotations.DaoFactory;
import com.datastax.oss.driver.api.mapper.annotations.DaoKeyspace;
import com.datastax.oss.driver.api.mapper.annotations.Mapper;

@Mapper
public interface ContentMapper {
    @DaoFactory
    ContentDao contentDao(@DaoKeyspace CqlIdentifier keyspace);
}
