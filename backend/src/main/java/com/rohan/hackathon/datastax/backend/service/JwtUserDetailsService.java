package com.rohan.hackathon.datastax.backend.service;

import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {


    private UserRepository userRepository;

    public JwtUserDetailsService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new JwtUserDetails(user.getUserId(), user.getEmail(), user.getPassword());
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


