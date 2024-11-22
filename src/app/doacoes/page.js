"use client";

import Pagina from "@/components/Pagina";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { mask } from "remask"; 
import { FaHeart } from "react-icons/fa";

export default function Doacao() {
    const [donationAmount, setDonationAmount] = useState("");//Aqui armazena o valor da doação
    const [selectedProject, setSelectedProject] = useState(""); 
    const [projects, setProjects] = useState([]); 

    useEffect(() => {
        // Carrega os projetos do localStorage
        const savedProjects = JSON.parse(localStorage.getItem('projetos')) || [];
        setProjects(savedProjects);
    }, []);

    const handleDonationChange = (e) => {

        const maskedValue = mask(e.target.value, ["R$ 999.999,99"]);
        setDonationAmount(maskedValue);
    };

    const handleDonationSubmit = (e) => {
        e.preventDefault();

        // Salva a doação no localStorage
        const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
        const novaDoacao = {
            projeto: selectedProject,
            valor: donationAmount,
            data: new Date().toISOString() // Salva a data da doação
        };

        doacoes.push(novaDoacao);
        localStorage.setItem('doacoes', JSON.stringify(doacoes));

        alert(`Obrigado por doar ${donationAmount} para o projeto: ${selectedProject}!`);
        setDonationAmount(""); // Limpa o valor após exibir o alerta
        setSelectedProject(""); // Limpa o projeto selecionado
    };

    return (
        <Pagina titulo="Faça sua Doação">
            <Container className="my-5">
                <Row className="text-center mb-4">
                    <Col>
                        <h1 className="display-4">Sua Doação Faz a Diferença</h1>
                        <p className="lead">Sua contribuição ajuda a transformar vidas e criar um mundo melhor. Junte-se a nós nessa jornada solidária!</p>
                        <FaHeart style={{ color: '#FF6347', fontSize: '40px' }} />
                    </Col>
                </Row>
                
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 shadow-sm">
                            <Card.Body>
                                <h4 className="mb-4 text-center">Escolha o Valor da Sua Doação</h4>
                                <Form onSubmit={handleDonationSubmit}>
                                    <Form.Group>
                                        <div className="d-flex justify-content-around mb-3">
                                            <Button variant="outline-primary" onClick={() => setDonationAmount("R$ 10,00")}>R$ 10</Button>
                                            <Button variant="outline-primary" onClick={() => setDonationAmount("R$ 20,00")}>R$ 20</Button>
                                            <Button variant="outline-primary" onClick={() => setDonationAmount("R$ 50,00")}>R$ 50</Button>
                                            <Button variant="outline-primary" onClick={() => setDonationAmount("R$ 100,00")}>R$ 100</Button>
                                        </div>
                                        <Form.Label>Ou insira outro valor:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Valor da doação em reais"
                                            value={donationAmount}
                                            onChange={handleDonationChange}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Escolha um Projeto</Form.Label>
                                        <Form.Select
                                            value={selectedProject}
                                            onChange={(e) => setSelectedProject(e.target.value)}
                                            required
                                        >
                                            <option value="">Selecione um projeto</option>
                                            {projects.map((project) => (
                                                <option key={project.id} value={project.nome}>
                                                    {project.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <div className="text-center mt-4">
                                        <Button variant="success" type="submit">Doar Agora</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5 text-center">
                    <Col>
                        <p className="text-muted">Sua doação será destinada aos nossos projetos, ajudando pessoas e comunidades a alcançarem um futuro melhor.</p>
                        <p className="text-muted">Entre em contato se precisar de mais informações: <a href="mailto:contato@voluntariado.com">contato@voluntariado.com</a></p>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
