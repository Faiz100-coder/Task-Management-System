package com.taskmanagement.taskmanager.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "tasks")
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String description;

	@Enumerated(EnumType.STRING)
	private Status status;

	private LocalDate dueDate;

	private Long userId; // will be set from Auth Service

	public enum Status {
		TODO, IN_PROGRESS, DONE
	}

}
