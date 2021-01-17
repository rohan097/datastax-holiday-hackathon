package com.rohan.hackathon.datastax.backend.model;

import com.datastax.oss.driver.api.mapper.annotations.CqlName;
import com.datastax.oss.driver.api.mapper.annotations.Entity;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

import java.time.Instant;
import java.util.UUID;

/*
 * This entity class is paritioned on profile name so that
 * I can search by profile name and ensure that only one user
 * exists with any given profile name.
 * */
@Entity
@CqlName("USERS_BY_PROFILE")
public class UsersByProfile {

    private UUID userId = UUID.randomUUID();
    private String email;
    @PrimaryKey
    private String profileName;
    private String password;
    private Instant createdAt = Instant.now();

    public UsersByProfile() {
    }

    public UsersByProfile(User user) {
        this.userId = user.getUserId();
        this.profileName = user.getProfileName();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }


    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", profileName='" + profileName + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
