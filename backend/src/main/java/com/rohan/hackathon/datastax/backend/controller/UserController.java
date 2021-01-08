package com.rohan.hackathon.datastax.backend.controller;

import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/user/signup")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        logger.info("Received request to signup user: {}", user);
        if (userService.createNewUser(user)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }
}
