'use client';

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import * as Yup from 'yup';
import React from 'react';

export default function Page() {
    const route = useRouter();
    const { id } = useParams();
    const [evento, setEvento] = useState({
        titulo: '',
        data: '',
        hora: '',
        local: '',
        descricao: '',
        imagem: ''
    });

    useEffect(() => {
        const eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
        
        if (id) {
            const eventoEncontrado = eventosCadastrados.find(item => item.id === String(id)); 
            
            if (eventoEncontrado) {
                setEvento(eventoEncontrado);
            } else {
                alert('Evento não encontrado');
                route.push('/eventos');
            }
        }
    }, [id, route]);

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required('O título do evento é obrigatório.'),
        data: Yup.date().required('A data é obrigatória.'),
        hora: Yup.string().required('A hora é obrigatória.'),
        local: Yup.string().required('O local é obrigatório.'),
        descricao: Yup.string().required('A descrição é obrigatória.'),
        imagem: Yup.string().url('A imagem deve ser uma URL válida.').required('A imagem do evento é obrigatória.')
    });

    function salvar(dados) {
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        const index = eventos.findIndex(item => item.id === String(id));

        if (index !== -1) {
            // Se o evento já existe, atualize suas informações
            eventos[index] = { ...eventos[index], ...dados };
        } else {
            // Se não existir, crie um novo evento
            dados.id = uuidv4();
            eventos.push(dados);
        }

        localStorage.setItem('eventos', JSON.stringify(eventos));
        route.push('/eventos'); // Redireciona após salvar
    }

    return (
        <Pagina titulo="Cadastro de Evento">
            <Formik
                initialValues={evento}
                validationSchema={validationSchema}
                onSubmit={values => salvar(values)}
                enableReinitialize
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="titulo"
                                value={values.titulo}
                                onChange={handleChange}
                                isInvalid={!!errors.titulo}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="data">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                name="data"
                                value={values.data}
                                onChange={handleChange}
                                isInvalid={!!errors.data}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="hora">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="hora"
                                value={values.hora}
                                onChange={handleChange}
                                isInvalid={!!errors.hora}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="local">
                            <Form.Label>Local</Form.Label>
                            <Form.Control
                                type="text"
                                name="local"
                                value={values.local}
                                onChange={handleChange}
                                isInvalid={!!errors.local}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descricao"
                                value={values.descricao}
                                onChange={handleChange}
                                isInvalid={!!errors.descricao}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imagem">
                            <Form.Label>Imagem do Evento</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem"
                                value={values.imagem}
                                onChange={handleChange}
                                isInvalid={!!errors.imagem}
                                placeholder="URL da imagem do evento"
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="success">
                               <FaCheck /> Salvar
                            </Button>
                            <Link href="/eventos" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
