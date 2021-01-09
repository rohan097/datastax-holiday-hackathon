package com.rohan.hackathon.datastax.backend.service;

import com.rohan.hackathon.datastax.backend.exception.AuthenticationException;
import com.rohan.hackathon.datastax.backend.exception.LoginException;
import com.rohan.hackathon.datastax.backend.model.JwtRequest;
import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.repository.UserRepository;
import com.rohan.hackathon.datastax.backend.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
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
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        logger.info("Found user = {}.", userDetails);
        return jwtTokenUtil.generateToken(userDetails);
    }

    private void authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException | BadCredentialsException e) {
            logger.error("Invalid credentials received: {}", e.getMessage());
            throw new AuthenticationException(e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Something went wrong while trying to login: {}", e.getMessage(), e);
            throw new LoginException(e.getMessage(), e);
        }
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
