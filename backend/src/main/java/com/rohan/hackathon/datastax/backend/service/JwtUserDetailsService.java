package com.rohan.hackathon.datastax.backend.service;

import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.model.UsersByProfile;
import com.rohan.hackathon.datastax.backend.repository.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    public JwtUserDetailsService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public JwtUserDetails loadUserByUsername(String username) {
        UsersByProfile user = userRepository.findByProfile(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new JwtUserDetails(user.getUserId(), user.getProfileName(), user.getPassword());
    }

//    public UserDetailEntity updateUser(String username, String password) {
//        UserDetailEntity user = userRepository.findByEmail(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        } else {
//            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//            user.setPassword(passwordEncoder.encode(password));
//            userRepository.save(user);
//            return user;
//        }
//    }

}


