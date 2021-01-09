package com.rohan.hackathon.datastax.backend.controller;

import com.rohan.hackathon.datastax.backend.exception.AuthenticationException;
import com.rohan.hackathon.datastax.backend.exception.LoginException;
import com.rohan.hackathon.datastax.backend.model.JwtRequest;
import com.rohan.hackathon.datastax.backend.model.JwtResponse;
import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        logger.info("Received request to signup user: {}", user);
        if (userService.createNewUser(user)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        logger.info("Received request to login: {}", authenticationRequest);
        String token = this.userService.login(authenticationRequest);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler({LoginException.class})
    public ResponseEntity<String> handleLoginException(LoginException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
