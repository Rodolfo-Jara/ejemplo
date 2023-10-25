
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from 'reactstrap'
import FetchEmployee from './components/FetchEmployee';
import ModalEmployee from './components/ModalEmployee';
import React, { useEffect, useState } from 'react';


const App = () => {
    const [employees, setEmployees] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);



    const listarEmployees = async () => {
        try {
            const response = await fetch("http://localhost:5178/employee/listar");
            const data = await response.json();
            setEmployees(data)
            console.log(data);
        } catch (error) {
            console.error("Error en fetchData: ", error);
        }
    }
    useEffect(() => {
        listarEmployees()
    },[])

    const guardarEmployee = async (employee) => {
        try {
            const response = await fetch("http://localhost:5178/employee/Guardar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(employee)
            });

            if (response.ok) {
                setMostrarModal(!mostrarModal);
                listarEmployees();
            } else {
                // Manejo de errores cuando la respuesta no es exitosa
                const errorData = await response.text(); // Aquí estamos leyendo el cuerpo de la respuesta como texto
                console.error("Error en saveEmployee:", errorData);
            }
        } catch (error) {
            // Manejo de errores en caso de problemas con la solicitud
            console.error("Error en saveEmployee:", error);
        }
    }




   
    const updateEmployee = async (employee) => {
        console.log("Updating employee:", employee);
        const response = await fetch("http://localhost:5178/employee/editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            // Actualiza la lista de empleados después de editar
            listarEmployees();
        }
    }


    const eliminarEmployee = async (id) => {
        var respuesta = window.confirm("¿Desea eliminar el contacto?");

        if (!respuesta) {
            return;
        }

        const response = await fetch(`http://localhost:5178/employee/Eliminar/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            listarEmployees();
        }
    }
    return (
        <Container responsive>
            <Row className="mt-5">
                <Col sm="12">

                    <Card>
                        <CardHeader>
                            <h5>Employee List</h5>
                        </CardHeader>

                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)} >AGREGAR</Button>
                            <hr></hr>

                            <FetchEmployee data={employees}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarEmployee={eliminarEmployee}

                            />
                        </CardBody>
                    </Card>

                </Col>
            </Row>
            <ModalEmployee
                mostrarModal={mostrarModal}

                setMostrarModal={setMostrarModal}
                guardarEmployee={guardarEmployee}

                editar={editar}
                setEditar={setEditar}
                updateEmployee={updateEmployee }
                />
        </Container>
    )
}
export default App;
