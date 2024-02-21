import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {FaCheck, FaEdit, FaTrash, FaSave} from "react-icons/fa"

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        id: Math.random(),
        name: taskName,
        done: false
      };
      setTasks([...tasks, newTask]);
      setTaskName("");
    }
  };

  const handleTaskChecked = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (id, name) => {
    setEditingTaskId(id);
    setEditingTaskName(name);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, name: editingTaskName } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  const handleRemoveAllCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.done);
    setTasks(updatedTasks);
  };

  const completedTasksCount = tasks.filter((task) => task.done).length;
  const showRemoveAllCompletedTasksButton = completedTasksCount >= 1;

  return (
    <>
    <Container>
      <h1 className="text-center fs-2">Lista de Tarefas</h1>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Form.Control
            type="text"
            placeholder="Adicione uma tarefa aqui..."
            className="me-2"
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </Col>
        <Col xs={2} className="d-flex align-items-center">
          <Button variant="primary" type="button" size="sm" onClick={handleAddTask}>
            <FaCheck />
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleTaskChecked(task.id)}
                  className="me-2"
                />
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingTaskName}
                      onChange={(e) => setEditingTaskName(e.target.value)}
                      className="form-control me-2"
                    />
                    <Button variant="success" size="sm" onClick={handleSaveEdit}>
                      <FaSave />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className={task.done ? "text-muted" : ""}>{task.name}</span>
                    <Button variant="info" size="sm" className="ms-auto me-2" onClick={() => handleEditTask(task.id, task.name)}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveTask(task.id)}>
                      <FaTrash />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      {showRemoveAllCompletedTasksButton && (
        <Row className="mt-3">
          <Col>
            <Button variant="danger" size="sm" onClick={handleRemoveAllCompletedTasks}>
               <FaTrash />
            </Button>
          </Col>
        </Row>
      )}
    </Container>
    </>
  );
}

export default App;

