package com.taskmanagement.taskmanager.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.taskmanager.dto.TaskRequest;
import com.taskmanagement.taskmanager.dto.TaskResponse;
import com.taskmanagement.taskmanager.entity.Task;
import com.taskmanagement.taskmanager.service.interfaces.TaskService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
	public class TaskController {

	    private final TaskService taskService;

	    // In real microservices, userId comes from JWT (Auth Service)
//	    private Long mockUserId() {
//	        return 1L; // for now, assume logged-in user = 1
//	    }

	    @PostMapping
	    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest request) {
	        return ResponseEntity.ok(taskService.createTask(request));
	    }


	    @GetMapping
	    public ResponseEntity<List<Task>> getAllTasks() {
	        List<Task> tasks = taskService.getAllTasks();
	        return ResponseEntity.ok(tasks);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
	        return ResponseEntity.ok(taskService.getTaskById(id));
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
	        return ResponseEntity.ok(taskService.updateTask(id, request));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
	        taskService.deleteTask(id);
	        return ResponseEntity.ok("Task deleted successfully");
	    }
	}





