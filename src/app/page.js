"use client";

import Pagina from "@/components/Pagina";
import { Pie } from "react-chartjs-2"; // biblioteca do gráfico de pizza
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chart, registerables } from "chart.js"; 

// Registrando os componentes necessários do Chart.js para funcionar o grafico
Chart.register(...registerables);

export default function GraficoDoacoes() {
    const [dataChart, setDataChart] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total de Doações',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(153, 102, 255, 0.6)', 
                ],
                borderWidth: 1, 
                hoverOffset: 4, 
            },
        ],
    });

    useEffect(() => {
        const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
        const projetos = {};

        // Agrupar doações por projeto
        doacoes.forEach(doacao => {
            const projeto = doacao.projeto;
            const valor = parseFloat(doacao.valor.replace('R$', '').replace('.', '').replace(',', '.'));

            if (projetos[projeto]) {
                projetos[projeto] += valor;
            } else {
                projetos[projeto] = valor;
            }
        });

        // Preparando os dados para o gráfico
        setDataChart({
            labels: Object.keys(projetos),
            datasets: [
                {
                    label: 'Total de Doações',
                    data: Object.values(projetos),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4,
                },
            ],
        });
    }, []);

    return (
        <Pagina titulo="Sobre nós">
            <Container className="my-5">
                <Row className="text-center mb-4">
                    <Col>
                        <h1 className="display-4">Juntos somos MAIS FORTES</h1>
                        <p className="lead">Um projeto que visa unir forças para transformar vidas.</p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src="/images/juntos_somos_mais_fortes.jpg" 
                                alt="Projeto Juntos somos MAIS FORTES" 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <h2>Objetivo do Projeto</h2>
                        <p>
                            O projeto "Juntos somos MAIS FORTES" tem como objetivo implementar ações sociais que promovam a inclusão e o desenvolvimento de comunidades em situação de vulnerabilidade. Nossa missão é unir esforços para garantir que todos tenham acesso a oportunidades e recursos que melhorem suas vidas.
                        </p>
                    </Col>
                </Row>

                {/* Seção do Gráfico  */}
                <Row className="text-center mb-4" style={{ marginTop: '100px', backgroundColor: '#E0F7FA', padding: '20px', borderRadius: '8px' }}>
                    <Col>
                        <h1 className="display-4">Total de Doações por Projeto</h1>
                        <p className="lead">Visualize quais projetos receberam mais doações!</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Pie data={dataChart} options={{
                            responsive: true,
                            maintainAspectRatio: false, // Permite que o gráfico não mantenha a proporção
                        }} height={300} />
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
