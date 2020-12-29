package com.rohan.hackathon.datastax.backend.repository;

import com.datastax.oss.driver.api.mapper.annotations.Dao;
import com.datastax.oss.driver.api.mapper.annotations.Insert;
import com.datastax.oss.driver.api.mapper.annotations.Select;
import com.rohan.hackathon.datastax.backend.model.User;

@Dao
public interface UserDao {

    @Select
    User findByEmail(String email);

    @Insert(ifNotExists = true)
    Boolean save(User user);
}
