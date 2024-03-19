import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import MostrarPublicaciones from './MostrarPublicaciones';

function Publicaciones({ usuario }) {
    const [showModal, setShowModal] = useState(false);
    const [publicacion, setPublicacion] = useState('');
    const [usuariologin, setusuariologin] = useState(localStorage.getItem('nombre_usuario'));
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
      
        cargarPublicaciones();
    }, []);

    const cargarPublicaciones = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/publicacion');
            setPublicaciones(response.data);
        } catch (error) {
            console.error('Error al cargar las publicaciones:', error.message);
        }
    };

    const handleNuevoPost = () => setShowModal(true);

    const handleGuardarPost = async () => {
        event.preventDefault();
        try {
            const data = {
                publicacion: publicacion,
                usuario: usuariologin
            };

            let url = 'http://localhost:4000/api/publicacion';
            const response = await axios.post(url, data);

            if (response.data.mensaje === 'Insercion Exitosa') {

                cargarPublicaciones();
                setPublicacion('');
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'La publicación se ha realizado correctamente',
                });
                setShowModal(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al publicar la publicación',
                });
            }
        } catch (error) {
            console.error('Error al publicar la publicación:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al publicar la publicación',
            });
        }
    };

    return (
        <div>
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
            <Row>
                <Col md={3}>
                    <img src="banner1.jpg" alt="Banner 1" className="img-fluid mb-3" />
                </Col>
                <Col md={6}>
                    <MostrarPublicaciones publicaciones={publicaciones} />
                </Col>
                <Col md={3}>
                    <img src="banner3.jpg" alt="Banner 3" className="img-fluid mb-3" />
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleGuardarPost}>
                        <Form.Group controlId="formComentario">
                            <Form.Label>Comentario (máximo 280 caracteres)</Form.Label>
                            <Form.Control as="textarea" rows={3} maxLength={280} value={publicacion} onChange={(e) => setPublicacion(e.target.value)} />
                        </Form.Group>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Publicar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Publicaciones;
