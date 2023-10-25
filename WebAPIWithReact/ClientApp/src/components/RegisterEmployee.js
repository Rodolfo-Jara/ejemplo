import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Renderiza la lista de tareas aquí

    return (
        <h1>Hello world</h1>
        // JSX para la lista de tareas
    )
}

export default TaskList;

