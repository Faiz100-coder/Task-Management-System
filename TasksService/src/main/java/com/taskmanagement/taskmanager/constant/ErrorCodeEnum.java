package com.taskmanagement.taskmanager.constant;

import lombok.Getter;

@Getter
public enum ErrorCodeEnum {
	
	GENERIC_ERROR("30000","Something went wrong . try again lagter . "),
	INVALID_ID_ERROR("30001"," Id is not present in Database. check the Id and try again . "),
	UPDATE_ERROR("30002","Error While Updating .. "),
	INVALID_USER_ID("30003","Invalid User ID."),
	DELETE_ERROR("30003","Error Deleting the data .."),
	NO_TASKS_FOUND("30004","No tasks found for this user."),
	NOT_FOUND("30001","check the fields and try again later");
	
	
	
	
	private String errorCode;
	private String errorMessage;
	
	private ErrorCodeEnum(String errorCode,String errorMessage) {
		this.errorCode=errorCode;
		this.errorMessage=errorMessage;
	}

}
