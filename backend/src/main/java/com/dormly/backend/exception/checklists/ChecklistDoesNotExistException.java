package com.dormly.backend.exception.checklists;

public class ChecklistDoesNotExistException extends RuntimeException {
    public ChecklistDoesNotExistException(String message) {
        super(message);
    }
}
