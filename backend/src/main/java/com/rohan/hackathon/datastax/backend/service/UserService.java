package com.rohan.hackathon.datastax.backend.service;

import com.rohan.hackathon.datastax.backend.exception.AuthenticationException;
import com.rohan.hackathon.datastax.backend.exception.LoginException;
import com.rohan.hackathon.datastax.backend.exception.SignUpException;
import com.rohan.hackathon.datastax.backend.model.JwtRequest;
import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.model.UsersByProfile;
import com.rohan.hackathon.datastax.backend.repository.user.UserRepository;
import com.rohan.hackathon.datastax.backend.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService jwtUserDetailsService;
    private final AuthenticationManager authenticationManager;


    public UserService(final JwtTokenUtil jwtTokenUtil, final UserRepository userRepository, final PasswordEncoder passwordEncoder, final JwtUserDetailsService jwtUserDetailsService, final AuthenticationManager authenticationManager) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.authenticationManager = authenticationManager;
    }

    public String login(JwtRequest authenticationRequest) {
        authenticate(authenticationRequest.getProfileName(), authenticationRequest.getPassword());

        final JwtUserDetails userDetails = (JwtUserDetails) jwtUserDetailsService
                .loadUserByUsername(authenticationRequest.getProfileName());
        logger.info("Found user = {}.", userDetails);
        return jwtTokenUtil.generateToken(userDetails);
    }

    private void authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException | LockedException | BadCredentialsException e) {
            logger.error("Invalid credentials received: {}", e.getMessage());
            throw new AuthenticationException(e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Something went wrong while trying to login: {}", e.getMessage(), e);
            throw new LoginException(e.getMessage(), e);
        }
    }

    public void createNewUser(User user) {
        if (doesUserExist(user.getProfileName())) {
            logger.info("User with profile name = {} already exists.", user.getProfileName());
            throw new SignUpException("User already exists with Profile Name = " + user.getProfileName() + ".");
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (!saveUser(user)) {
                throw new SignUpException("Could not save user.");
            }
        }
    }

    private Boolean saveUser(User user) {
        if (saveUserInUserTable(user)) {
            if (saveUserInUserByProfileTable(user)) {
                logger.info("Successfully saved User in both tables.");
                return true;
            } else {
                logger.info("Rolling back change to USERS table by deleting user: {}.", user);
                userRepository.delete(user);
            }
        }
        return false;
    }

    private Boolean saveUserInUserTable(User user) {
        logger.info("Saving User is USERS table.");
        Boolean isSaved = false;
        try {
            isSaved = userRepository.save(user);
        } catch (Exception e) {
            logger.error("An exception occurred while saving User to USERS table: {}", e.getMessage(), e);
            throw new SignUpException(e.getMessage(), e);
        }
        return isSaved;
    }

    private Boolean saveUserInUserByProfileTable(User user) {
        logger.info("Saving User is USERS_BY_PROFILE table.");
        UsersByProfile usersByProfile = new UsersByProfile(user);
        Boolean isSaved = false;
        try {
            isSaved = userRepository.save(usersByProfile);
        } catch (Exception e) {
            logger.error("An exception occurred while saving User to USERS_BY_PROFILE table: {}", e.getMessage(), e);
            throw new SignUpException(e.getMessage(), e);
        }
        return isSaved;
    }


    private boolean doesUserExist(String profileName) {
        UsersByProfile user = userRepository.findByProfile(profileName);
        return user != null;
    }
}
