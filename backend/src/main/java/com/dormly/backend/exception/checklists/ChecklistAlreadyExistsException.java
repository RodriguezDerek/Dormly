package com.dormly.backend.exception.checklists;

public class ChecklistAlreadyExistsException extends RuntimeException {
    public ChecklistAlreadyExistsException(String message) {
        super(message);
    }
}
