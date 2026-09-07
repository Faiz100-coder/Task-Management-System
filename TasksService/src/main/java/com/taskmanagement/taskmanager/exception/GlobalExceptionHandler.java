package com.taskmanagement.taskmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.taskmanagement.taskmanager.constant.ErrorCodeEnum;
import com.taskmanagement.taskmanager.dto.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Component
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorResponse> handleProjectException(NotFoundException ex) {
		
		ErrorResponse errorResponse = new ErrorResponse(	ex.getErrorCode(),ex.getErrorMessage());
		
		
		log.info("errorResponse :  {}",errorResponse);
		return new ResponseEntity<>(errorResponse,ex.getHttpStatus());
		
	}
	
	
	// generic exception 
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException (Exception ex) {
		
		ErrorResponse errorResponse = new ErrorResponse(
				ErrorCodeEnum.GENERIC_ERROR.getErrorCode(),
				ErrorCodeEnum.GENERIC_ERROR.getErrorMessage());
		log.info("errorResponse :  {}",errorResponse);
		
		return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
		
	}

}

