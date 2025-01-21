package com.iit.exam.exception;

public class EntityNotInactiveException extends RuntimeException {
    public EntityNotInactiveException(String message) {
        super(message);
    }
}

