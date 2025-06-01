package com.dormly.backend.exception;

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

}
