import {Table, Button } from 'reactstrap'

const FetchEmployee = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarEmployee }) => {

    const enviarDatos = (employee) => {
        setEditar(employee); // Pasa el objeto employee completo, no solo el EmployeeId
        setMostrarModal(!mostrarModal);
    }






    return (
        <div>
            <h2>List of Employees</h2>
            <Table striped responsive={true.toString()}>
                <thead>
                    <tr>
                       
                        <th scope="col">Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Department</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (data.length < 1) ? (
                            <tr>
                                <td colSpan="5">Esta lista esta vacia</td>
                            </tr>
                        ) : (
                                data.map((item) => (

                                    <tr key={item.employeeId}>

                                        <td>{item.name}</td>
                                        <td>{item.city}</td>
                                        <td>{item.departament}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                            <Button color="primary" className="me-2" onClick={() => enviarDatos(item)}
                                            >actualizar</Button>
                                            <Button
                                                color="danger"
                                                onClick={() => eliminarEmployee(item.employeeId)} // Utiliza item.employeeId aquí
                                            >
                                                Eliminar
                                            </Button>

                                        </td>
                                    </tr>
                                ))
                        )
                               
                        
                        
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default FetchEmployee;