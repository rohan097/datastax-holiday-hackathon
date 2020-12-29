package com.rohan.hackathon.datastax.backend.service;

import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean createNewUser(User user) {
        if (doesUserExist(user.getEmail())) {
            logger.info("User with email = {} already exists.", user.getEmail());
            return false;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
    }

    private boolean doesUserExist(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }
}
