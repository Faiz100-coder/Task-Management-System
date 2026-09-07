
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Card, Badge, ProgressBar, Form } from "react-bootstrap";

// export default function Tasks() {
//     const [tasks, setTasks] = useState([]);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [status, setStatus] = useState("TODO");
//     const [editingTask, setEditingTask] = useState(null);

//     const api = "http://localhost:8080/api/tasks"; // 🔗 your backend endpoint

//     // Fetch tasks
//     useEffect(() => {
//         axios.get(api).then((res) => setTasks(res.data));
//     }, []);

//     // Calculate overall progress
//     const progress =
//         tasks.length > 0
//             ? (tasks.filter((t) => t.status === "DONE").length / tasks.length) * 100
//             : 0;

//     // Add or update task
//     const handleSubmit = () => {
//         if (!title.trim() || !description.trim()) return;

//         if (editingTask) {
//             axios
//                 .put(`${api}/${editingTask.id}`, { title, description, status })
//                 .then(() => {
//                     setTasks(
//                         tasks.map((t) =>
//                             t.id === editingTask.id ? { ...t, title, description, status } : t
//                         )
//                     );
//                     resetForm();
//                 });
//         } else {
//             axios.post(api, { title, description, status }).then((res) => {
//                 setTasks([...tasks, res.data]);
//                 resetForm();
//             });
//         }
//     };

//     // Mark task as complete
//     const handleComplete = (task) => {
//         axios
//             .put(`${api}/${task.id}`, { ...task, status: "DONE" })
//             .then(() => {
//                 setTasks(
//                     tasks.map((t) =>
//                         t.id === task.id ? { ...t, status: "DONE" } : t
//                     )
//                 );
//             });
//     };

//     // Delete task
//     const handleDelete = (id) => {
//         axios.delete(`${api}/${id}`).then(() => {
//             setTasks(tasks.filter((t) => t.id !== id));
//         });
//     };

//     // Reset form
//     const resetForm = () => {
//         setTitle("");
//         setDescription("");
//         setStatus("TODO");
//         setEditingTask(null);
//     };

//     return (
//         <div className="container my-4">
//             {/* Global Progress */}
//             <h3 className="mb-3">Task Progress</h3>
//             <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" />

//             {/* Add / Edit Form */}
//             <Card className="mb-4 shadow-sm">
//                 <Card.Body>
//                     <h5>{editingTask ? "Edit Task" : "Add New Task"}</h5>
//                     <div className="d-flex gap-2">
//                         <Form.Control
//                             placeholder="Title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                         <Form.Control
//                             placeholder="Description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                         <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
//                             <option value="TODO">TODO</option>
//                             <option value="IN_PROGRESS">IN PROGRESS</option>
//                             <option value="DONE">DONE</option>
//                         </Form.Select>
//                         <Button onClick={handleSubmit}>
//                             {editingTask ? "Update" : "Add"}
//                         </Button>
//                         {editingTask && (
//                             <Button variant="secondary" onClick={resetForm}>
//                                 Cancel
//                             </Button>
//                         )}
//                     </div>
//                 </Card.Body>
//             </Card>

//             {/* Task List */}
//             <h4>Task List</h4>
//             {tasks.map((task) => (
//                 <Card key={task.id} className="mb-3 shadow-sm">
//                     <Card.Body className="d-flex justify-content-between align-items-center">
//                         <div>
//                             <Card.Title>{task.title}</Card.Title>
//                             <Card.Text className="text-muted">{task.description}</Card.Text>
//                             <Badge
//                                 bg={
//                                     task.status === "DONE"
//                                         ? "success"
//                                         : task.status === "IN_PROGRESS"
//                                             ? "warning"
//                                             : "secondary"
//                                 }
//                             >
//                                 {task.status}
//                             </Badge>
//                         </div>
//                         <div className="d-flex gap-2">
//                             {task.status !== "DONE" && (
//                                 <Button variant="success" size="sm" onClick={() => handleComplete(task)}>
//                                     Complete
//                                 </Button>
//                             )}
//                             <Button
//                                 variant="warning"
//                                 size="sm"
//                                 onClick={() => {
//                                     setEditingTask(task);
//                                     setTitle(task.title);
//                                     setDescription(task.description);
//                                     setStatus(task.status);
//                                 }}
//                             >
//                                 Edit
//                             </Button>
//                             <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
//                                 Delete
//                             </Button>
//                         </div>
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Badge, ProgressBar, Form, InputGroup } from "react-bootstrap";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 new state

    const api = "http://localhost:8080/api/tasks"; // 🔗 your backend endpoint

    // Fetch tasks
    useEffect(() => {
        axios.get(api).then((res) => setTasks(res.data));
    }, []);

    // Calculate overall progress
    const progress =
        tasks.length > 0
            ? (tasks.filter((t) => t.status === "DONE").length / tasks.length) * 100
            : 0;

    // Add or update task
    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) return;

        if (editingTask) {
            axios
                .put(`${api}/${editingTask.id}`, { title, description, status })
                .then(() => {
                    setTasks(
                        tasks.map((t) =>
                            t.id === editingTask.id ? { ...t, title, description, status } : t
                        )
                    );
                    resetForm();
                });
        } else {
            axios.post(api, { title, description, status }).then((res) => {
                setTasks([...tasks, res.data]);
                resetForm();
            });
        }
    };

    // Mark task as complete
    const handleComplete = (task) => {
        axios
            .put(`${api}/${task.id}`, { ...task, status: "DONE" })
            .then(() => {
                setTasks(
                    tasks.map((t) =>
                        t.id === task.id ? { ...t, status: "DONE" } : t
                    )
                );
            });
    };

    // Delete task
    const handleDelete = (id) => {
        axios.delete(`${api}/${id}`).then(() => {
            setTasks(tasks.filter((t) => t.id !== id));
        });
    };

    // Reset form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("TODO");
        setEditingTask(null);
    };

    // 🔍 Filter tasks by search
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container my-4">
            {/* Global Progress */}
            <h3 className="mb-3">Task Progress</h3>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" />

            {/* Add / Edit Form */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <h5>{editingTask ? "Edit Task" : "Add New Task"}</h5>
                    <div className="d-flex gap-2">
                        <Form.Control
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Control
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </Form.Select>
                        <Button onClick={handleSubmit}>
                            {editingTask ? "Update" : "Add"}
                        </Button>
                        {editingTask && (
                            <Button variant="secondary" onClick={resetForm}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {/* 🔍 Search Bar */}
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search tasks by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            {/* Task List */}
            <h4>Task List</h4>
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                    <Card key={task.id} className="mb-3 shadow-sm">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text className="text-muted">{task.description}</Card.Text>
                                <Badge
                                    bg={
                                        task.status === "DONE"
                                            ? "success"
                                            : task.status === "IN_PROGRESS"
                                                ? "warning"
                                                : "secondary"
                                    }
                                >
                                    {task.status}
                                </Badge>
                            </div>
                            <div className="d-flex gap-2">
                                {task.status !== "DONE" && (
                                    <Button variant="success" size="sm" onClick={() => handleComplete(task)}>
                                        Complete
                                    </Button>
                                )}
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => {
                                        setEditingTask(task);
                                        setTitle(task.title);
                                        setDescription(task.description);
                                        setStatus(task.status);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                                    Delete
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p className="text-muted">No tasks found</p>
            )}
        </div>
    );
}
