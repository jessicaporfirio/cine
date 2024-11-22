'use client'

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        setProjetos(JSON.parse(localStorage.getItem('projetos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o projeto?')) {
            const dados = projetos.filter(item => item.id !== id);
            localStorage.setItem('projetos', JSON.stringify(dados));
            setProjetos(dados);
        }
    }

    return (
        <Pagina titulo="Projetos de Voluntariado" className="custom-bg">

            <Link
                href="/projetos/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo Projeto
            </Link>

            <Row>
                {projetos.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src={item.imagem} 
                                style={{ height: '200px', objectFit: 'cover' }} 
                                alt={item.nome} 
                            />
                            <Card.Body>
                                <Card.Title>{item.nome}</Card.Title>
                                <Card.Text>
                                    {item.descricao}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link href={`/projetos/form/${item.id}`}>
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
