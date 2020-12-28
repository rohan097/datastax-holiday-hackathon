package com.rohan.hackathon.datastax.backend.repository;

import com.rohan.hackathon.datastax.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class AstraUserRepository implements UserRepository {

    @Override
    public User findByEmail(String userName) {
        User user = new User();
        user.setEmail("test@g.com");
        user.setPassword("$2a$10$T4gnV1dlbkDGGnWZHia1Ve42VZekfpfQ83pxFlzL3Jw5YdC9whbhu");
        return user;
    }
}
