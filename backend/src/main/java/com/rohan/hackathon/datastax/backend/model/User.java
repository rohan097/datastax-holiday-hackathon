package com.rohan.hackathon.datastax.backend.model;

import com.datastax.oss.driver.api.mapper.annotations.CqlName;
import com.datastax.oss.driver.api.mapper.annotations.Entity;
import com.datastax.oss.driver.api.mapper.annotations.PartitionKey;

import java.time.Instant;
import java.util.UUID;

@Entity
@CqlName("users")
public class User {

    private UUID userId = UUID.randomUUID();
    @PartitionKey
    private String email;
    private String profileName;
    private String password;
    private String gender;
    private Instant createdAt = Instant.now();
    private Instant lastChangedAt = Instant.now();

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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastChangedAt() {
        return lastChangedAt;
    }

    public void setLastChangedAt(Instant lastChangedAt) {
        this.lastChangedAt = lastChangedAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", profileName='" + profileName + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                ", createdAt=" + createdAt +
                ", lastChangedAt=" + lastChangedAt +
                '}';
    }
}
