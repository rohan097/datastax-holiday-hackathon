package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.mapper.annotations.Dao;
import com.datastax.oss.driver.api.mapper.annotations.Insert;
import com.rohan.hackathon.datastax.backend.model.Experience;

@Dao
public interface ContentDao {

    @Insert(ifNotExists = true)
    Boolean save(Experience experience);
}
