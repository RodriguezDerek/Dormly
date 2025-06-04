package com.dormly.backend.exception;

import com.dormly.backend.exception.checklists.ChecklistAlreadyExistsException;
import com.dormly.backend.exception.checklists.ChecklistDoesNotExistException;
import com.dormly.backend.exception.items.ItemAlreadyExistsException;
import com.dormly.backend.exception.items.ItemDoesNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException exception){
        StringBuilder errors = new StringBuilder();
        exception.getBindingResult().getAllErrors().forEach(error -> {
            errors.append(error.getDefaultMessage()).append(", ");
        });

        return new ErrorResponse(errors.toString(), HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
    }

    @ExceptionHandler(ChecklistAlreadyExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleChecklistAlreadyExistsExceptions(ChecklistAlreadyExistsException exception){
        return new ErrorResponse(exception.getMessage(), HttpStatus.CONFLICT.value(), LocalDateTime.now());
    }

    @ExceptionHandler(ChecklistDoesNotExistException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleChecklistDoesNotExistExceptions(ChecklistDoesNotExistException exception){
        return new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND.value(), LocalDateTime.now());
    }

    @ExceptionHandler(ItemAlreadyExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleItemAlreadyExistsExceptions(ItemAlreadyExistsException exception){
        return new ErrorResponse(exception.getMessage(), HttpStatus.CONFLICT.value(), LocalDateTime.now());
    }

    @ExceptionHandler(ItemDoesNotExistException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleItemDoesNotExistExceptions(ItemDoesNotExistException exception){
        return new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND.value(), LocalDateTime.now());
    }
}
