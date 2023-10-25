import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap";

const ModalEmployee = ({ mostrarModal, setMostrarModal, guardarEmployee, editar, setEditar, updateEmployee }) => {
    const [formValues, setFormValues] = useState({
        name: "",
        city: "",
        departament: "",
        gender: "",
    });

    useEffect(() => {
        console.log("Editar:", editar);
        if (editar != null) {
            setFormValues({
                name: editar.name || "",
                city: editar.city || "",
                departament: editar.departament || "",
                gender: editar.gender || "",
            });
        } else {
            setFormValues({
                name: "",
                city: "",
                departament: "",
                gender: "",
            });
        }
    }, [editar]);

    const updateFormValue = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const enviarDatos = () => {
        const employee = {
            employeeId: editar ? editar.employeeId : 0,
            name: formValues.name,
            city: formValues.city,
            departament: formValues.departament,
            gender: formValues.gender,
        };

        if (employee.employeeId === 0) {
            guardarEmployee(employee);
        } else {
            updateEmployee(employee);
        }

        setMostrarModal(false);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setEditar(null);
    };

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{editar ? "Editar Employee" : "Nuevo Employee"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                            name="name"
                            value={formValues.name}
                            onChange={updateFormValue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Ciudad</Label>
                        <Input
                            name="city"
                            value={formValues.city}
                            onChange={updateFormValue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Departamento</Label>
                        <Input
                            name="departament"
                            value={formValues.departament}
                            onChange={updateFormValue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Género</Label>
                        <Input
                            name="gender"
                            value={formValues.gender}
                            onChange={updateFormValue}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>
                    Guardar
                </Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalEmployee;