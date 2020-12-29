package com.rohan.hackathon.datastax.backend.repository;

import com.rohan.hackathon.datastax.backend.model.User;

public interface UserRepository {

    User findByEmail(String userName);

    Boolean save(User user);
}
