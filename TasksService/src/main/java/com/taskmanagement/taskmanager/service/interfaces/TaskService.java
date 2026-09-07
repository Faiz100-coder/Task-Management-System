package com.taskmanagement.taskmanager.service.interfaces;


import java.util.List;

import com.taskmanagement.taskmanager.dto.TaskRequest;
import com.taskmanagement.taskmanager.dto.TaskResponse;
import com.taskmanagement.taskmanager.entity.Task;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);
    List<Task> getAllTasks();
    TaskResponse getTaskById(Long id);
    
    TaskResponse updateTask(Long id, TaskRequest request);
    void deleteTask(Long id);
}


