package com.taskmanagement.taskmanager.dto;


import java.time.LocalDate;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private String status;
    private LocalDate dueDate;
}

