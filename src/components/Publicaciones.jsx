import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

import MostrarPublicaciones from './MostrarPublicaciones'; // Importar el componente MostrarPublicaciones


function Publicaciones({ usuario }) {
    const [showModal, setShowModal] = useState(false);
    const [imagen, setImagen] = useState(null); // Cambiando a null inicialmente
    const [Publicacion, setComentario] = useState('');
    const [usuarioLogin, setusuario] = useState('');
    const handleNuevoPost = () => {
        setShowModal(true);
        setusuario(usuario);

    };

    const handleGuardarPost = async () => {
        try {
            const formData = new FormData();
            formData.append('imagen', imagen);
            formData.append('Publicacion', Publicacion);
            formData.append('Usuario', usuarioLogin);
     
            const response = await axios.post('http://localhost:4000/api/publicacion', formData);

            if (response.data.mensaje === 'Insercion Exitosa') {
                // Publicación exitosa
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'La publicación se ha realizado correctamente',
                });
            } else {
                // Error en la publicación
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al publicar la publicación',
                });
            }
        } catch (error) {
            console.error('Error al publicar la publicación:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al publicar la publicación',
            });
        }

        setShowModal(false);
    };

    return (
        <div>
            {/* Header */}
            <Row>
                <Col>
                    <Card bg="primary" text="white">
                        <Card.Body>
                            <Card.Title>
                                Bienvenido, {usuario}
                                <Button variant="primary" className="float-end" onClick={handleNuevoPost}>Nuevo Post</Button>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Main */}
            <Row>
                <Col md={3}>
                    {/* Columna lateral izquierda */}
                    <img src="banner1.jpg" alt="Banner 1" className="img-fluid mb-3" />
                </Col>
                <Col md={6}>

                    <MostrarPublicaciones /> {/* Aquí se llama al componente MostrarPublicaciones */}

                </Col>
                <Col md={3}>
                    {/* Columna lateral derecha */}
                    <img src="banner3.jpg" alt="Banner 3" className="img-fluid mb-3" />
                </Col>
            </Row>

            {/* Modal para nuevo post */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleGuardarPost}> {/* Manejar el evento de formulario */}
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Seleccionar imagen</Form.Label>
                            <Form.Control type="file" onChange={(e) => setImagen(e.target.files[0])} />
                        </Form.Group>
                        <Form.Group controlId="formComentario">
                            <Form.Label>Comentario (máximo 280  caracteres)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                maxLength={280 }
                                value={Publicacion}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit"> {/* Cambiar a type="submit" */}
                            Publicar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Publicaciones;
