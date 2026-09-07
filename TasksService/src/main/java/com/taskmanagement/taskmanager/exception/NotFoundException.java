package com.taskmanagement.taskmanager.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.ToString;


@Getter
@ToString


public class NotFoundException  extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4708515780498226469L;
	private final String errorCode;
	private final String errorMessage; 
	private final HttpStatus httpStatus;
	
public NotFoundException(String errorCode, String errorMessage, HttpStatus httpStatus ) {
		
		super(errorMessage);
		this.errorCode= errorCode;
		this.errorMessage= errorMessage;
		this.httpStatus=httpStatus;
		
	}
	

}
