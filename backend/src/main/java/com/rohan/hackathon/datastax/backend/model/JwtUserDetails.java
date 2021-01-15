package com.rohan.hackathon.datastax.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class JwtUserDetails implements UserDetails {

    private static final long serialVersionUID = 5155720064139820502L;

    private final UUID id;
    private final String username;
    private final String profileName;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtUserDetails(UUID id, String username, String profileName, String password) {
        this.id = id;
        this.username = username;
        this.profileName = profileName;
        this.password = password;
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("USER"));
        this.authorities = authorityList;
    }

    @JsonIgnore
    public UUID getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getProfileName() {
        return profileName;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "JwtUserDetails{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }
}


