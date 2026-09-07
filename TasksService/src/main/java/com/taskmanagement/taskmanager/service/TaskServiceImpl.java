package com.taskmanagement.taskmanager.service;

import java.util.List;


import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.taskmanagement.taskmanager.constant.ErrorCodeEnum;
import com.taskmanagement.taskmanager.dto.TaskRequest;
import com.taskmanagement.taskmanager.dto.TaskResponse;
import com.taskmanagement.taskmanager.entity.Task;
import com.taskmanagement.taskmanager.exception.NotFoundException;
import com.taskmanagement.taskmanager.repository.TaskRepository;
import com.taskmanagement.taskmanager.service.interfaces.TaskService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;
	private final ModelMapper modelMapper;

	public TaskResponse createTask(TaskRequest request) {

		Task task = modelMapper.map(request, Task.class);

		// Handle fields which is not present in TaskRequest
	
		task.setStatus(Task.Status.valueOf(request.getStatus()));

		// Save entity
		Task saved = taskRepository.save(task);
		log.info("data Saved : {} ", saved);
		// Map Entity -> DTO
		return mapToResponse(saved);
	}


// fetch all the data 
	
	  public List<Task> getAllTasks() {
	        List<Task> tasks = taskRepository.findAll(); // fetch all tasks from DB
	        if (tasks.isEmpty()) {
	            throw new NotFoundException(
	                ErrorCodeEnum.NO_TASKS_FOUND.getErrorCode(),
	                ErrorCodeEnum.NO_TASKS_FOUND.getErrorMessage(),
	                HttpStatus.NOT_FOUND
	            );
	        }
	        return tasks;
	    }
	/////////

	public TaskResponse getTaskById(Long id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new NotFoundException(
						ErrorCodeEnum.INVALID_ID_ERROR.getErrorCode(),
						ErrorCodeEnum.INVALID_ID_ERROR.getErrorMessage(),
						HttpStatus.NOT_FOUND));
		

		return mapToResponse(task);
	}

	public TaskResponse updateTask(Long id, TaskRequest request) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new NotFoundException(
						ErrorCodeEnum.UPDATE_ERROR.getErrorCode(),
						ErrorCodeEnum.UPDATE_ERROR.getErrorMessage(),
						HttpStatus.NOT_FOUND));



		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());
		task.setStatus(Task.Status.valueOf(request.getStatus()));
		task.setDueDate(request.getDueDate());

		return mapToResponse(taskRepository.save(task));
	}

	public void deleteTask(Long id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new NotFoundException(
						ErrorCodeEnum.INVALID_USER_ID.getErrorCode(),
						ErrorCodeEnum.INVALID_USER_ID.getErrorMessage(),
						HttpStatus.NOT_FOUND));



		taskRepository.delete(task);
	}

	private TaskResponse mapToResponse(Task task) {

		return modelMapper.map(task, TaskResponse.class);
	}
}
