import React from "react";
import { ProgressBar } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function TaskCard({ task, onEdit, onDelete }) {
    // Progress percentage based on status
    const getProgress = (status) => {
        switch (status) {
            case "TODO": return 25;
            case "IN_PROGRESS": return 60;
            case "DONE": return 100;
            default: return 0;
        }
    };

    const getVariant = (status) => {
        switch (status) {
            case "TODO": return "secondary";
            case "IN_PROGRESS": return "info";
            case "DONE": return "success";
            default: return "warning";
        }
    };

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{task.title}</h5>
                    <div>
                        <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => onEdit(task)}
                        >
                            <PencilSquare /> Edit
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(task.id)}
                        >
                            <Trash /> Delete
                        </button>
                    </div>
                </div>
                <p className="card-text text-muted">{task.description}</p>
                <ProgressBar
                    now={getProgress(task.status)}
                    variant={getVariant(task.status)}
                    label={task.status.replace("_", " ")}
                />
            </div>
        </div>
    );
}

