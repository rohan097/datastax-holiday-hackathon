package com.rohan.hackathon.datastax.backend.repository.user;

import com.datastax.oss.driver.api.mapper.annotations.Dao;
import com.datastax.oss.driver.api.mapper.annotations.Delete;
import com.datastax.oss.driver.api.mapper.annotations.Insert;
import com.datastax.oss.driver.api.mapper.annotations.Query;
import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.model.UsersByProfile;

@Dao
public interface UserDao {

    @Insert(ifNotExists = true)
    Boolean save(User user);

    @Insert(ifNotExists = true)
    Boolean save(UsersByProfile usersByProfile);

    @Query("SELECT * FROM USERS_BY_PROFILE WHERE PROFILE_NAME =  :profileName")
    UsersByProfile findByProfile(String profileName);

    @Delete
    Boolean delete(User user);
}
