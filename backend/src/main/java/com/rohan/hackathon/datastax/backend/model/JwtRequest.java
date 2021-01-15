package com.rohan.hackathon.datastax.backend.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;

public class JwtRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;
    @JsonAlias("email")
    private String username;
    private String profileName;
    private String password;

    //need default constructor for JSON Parsing
    public JwtRequest() {
    }

    public JwtRequest(String username, String profileName, String password) {
        this.setUsername(username);
        this.setProfileName(profileName);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "JwtRequest{" +
                "username='" + username + '\'' +
                "profileName='" + profileName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}