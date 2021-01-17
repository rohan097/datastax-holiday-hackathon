package com.rohan.hackathon.datastax.backend.repository.user;

import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.model.UsersByProfile;

public interface UserRepository {

    UsersByProfile findByProfile(String profileName);

    Boolean save(User user);

    Boolean save(UsersByProfile usersByProfile);

    Boolean delete(User user);
}
