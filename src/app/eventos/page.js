'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel, Card, Col, Row } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const eventosSalvos = JSON.parse(localStorage.getItem('eventos')) || [];
        setEventos(eventosSalvos);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dadosAtualizados = eventos.filter(item => item.id !== id);
            localStorage.setItem('eventos', JSON.stringify(dadosAtualizados));
            setEventos(dadosAtualizados);
        }
    }

    return (
        <Pagina titulo="Eventos">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/doacao-de-sangue.jpg"
                        alt="Primeira imagem"
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '10px',
                        borderRadius: '8px',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                    }}>
                        <h3>Doe Sangue</h3>
                        <p>Participe e faça a diferença no mundo!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/doacao-de-alimentos.jpg"
                        alt="Segunda imagem"
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '10px',
                        borderRadius: '8px',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                    }}>
                        <h3>Doe alimentos</h3>
                        <p>Participe e faça a diferença no mundo!</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/natal-solidario.jpeg"
                        alt="Terceira imagem"
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '10px',
                        borderRadius: '8px',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                    }}>
                        <h3>Natal solidário</h3>
                        <p>Faça uma criança feliz!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Link 
                href="/eventos/form" 
                className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo Evento
            </Link>

            <Row>
                {eventos.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={item.imagem || "/default-image.png"}
                                style={{ height: '200px', objectFit: 'cover' }}
                                alt={item.titulo || 'Imagem do evento'}
                            />
                            <Card.Body>
                                <Card.Title>{item.titulo}</Card.Title>
                                <Card.Text>{item.descricao}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link href={`/eventos/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
