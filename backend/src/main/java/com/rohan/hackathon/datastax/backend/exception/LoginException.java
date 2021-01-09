package com.rohan.hackathon.datastax.backend.exception;

public class LoginException extends RuntimeException {
    public LoginException(String message, Throwable cause) {
        super(message, cause);
    }
}
