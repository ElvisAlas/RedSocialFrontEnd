import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import sendIcon from '../assets/sendIcon.png';
function MostrarPublicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        // Lógica para obtener las publicaciones al montar el componente
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/publicacion');
                setPublicaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las publicaciones:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {publicaciones.map((publicacion) => (
                <Card key={publicacion.idheader} className="mb-3">
                    <Card.Body>
                        <Card.Title>Usuario: {publicacion.usuario}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Creado: {publicacion.creado}</Card.Subtitle>
                        {publicacion.imagen && (
                            <div>
                                <Card.Img src={`data:image/jpeg;base64,${publicacion.imagen}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </div>
                        )}
                        <Card.Text>
                            {publicacion.Publicacion}
                        </Card.Text>
                       
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <label htmlFor="comentario">Dejar Comentario:</label>
                                <input type="text" id="comentario" className="form-control" />
                            </div>
                            <div style={{marginTop:'29px',marginLeft:'3px'}}>
                                <Button variant="dark" onClick={() => handleEnviarComentario(publicacion.idheader)}>
                                    <img src={sendIcon} alt="Enviar" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                    Enviar
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default MostrarPublicaciones;
