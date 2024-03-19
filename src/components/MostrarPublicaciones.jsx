import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import sendIcon from '../assets/sendIcon.png';

function MostrarPublicaciones({ publicaciones }) {
    const [comentarios, setComentarios] = useState({});
    const [modalShow, setModalShow] = useState(false); 
    const [comentariosModal, setComentariosModal] = useState([]); 

    useEffect(() => {
        const initialComentarios = {};
        publicaciones.forEach((publicacion) => {

            initialComentarios[publicacion.idheader] = '';
        });
        setComentarios(initialComentarios);
    }, [publicaciones]);

    const handleEnviarComentario = async (publicacionId) => {
        event.preventDefault();
        try {
            const data = {
                idheader: publicacionId,
                comentario: comentarios[publicacionId],
                usuario: 'Aquí va el nombre del usuario actual'
            };

            const url = 'http://localhost:4000/api/publicacion/comentario';
            const response = await axios.post(url, data);

            if (response.data.mensaje === 'Insercion Exitosa') {
                const updatedComentarios = { ...comentarios, [publicacionId]: '' };
                setComentarios(updatedComentarios); 
            } else {
                console.error('Hubo un error al agregar el comentario');
            }
        } catch (error) {
            console.error('Error al enviar el comentario:', error.message);
        }
    };

    const cargarComentarios = async (publicacionId) => {
        event.preventDefault();
        try {
            const url = `http://localhost:4000/api/publicacion/?IDHeader=${publicacionId}`;
            const response = await axios.get(url);
            setComentariosModal(response.data);

            console.log(response.data)
            setModalShow(true); 
        } catch (error) {
            console.error('Error al cargar los comentarios:', error.message);
        }
    };

    return (
        <div>
            {publicaciones.map((publicacion) => (
                <Card key={publicacion.idheader} className="mb-3">
                    <Card.Body>
                        <Card.Title>Usuario: {publicacion.usuario}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Creado: {publicacion.creado}</Card.Subtitle>
                        <Card.Text>{publicacion.publicacion}</Card.Text>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                id={`comentario-${publicacion.idheader}`}
                                className="form-control"
                                placeholder="Dejar Comentario"
                                value={comentarios[publicacion.idheader] || ''} // Aseguramos que el valor siempre esté definido
                                onChange={(e) => setComentarios({ ...comentarios, [publicacion.idheader]: e.target.value })}
                            />
                            <Button variant="primary" onClick={() => handleEnviarComentario(publicacion.idheader)}>
                                <img src={sendIcon} alt="Enviar" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                Enviar
                            </Button>
                            {/* Label para mostrar los comentarios */}
                            <Button variant="link" onClick={() => cargarComentarios(publicacion.idheader)}>Ver comentarios</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            {/* Modal para mostrar los comentarios */}
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Comentarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {comentariosModal.map((comentario, index) => (
                        <div key={index}>
                            <p>{comentario}</p>
                            <hr />
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MostrarPublicaciones;
