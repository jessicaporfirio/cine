'use client';

import React, { useState, useEffect } from "react";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function Page() {
    const route = useRouter();
    const { id } = useParams();

    const [projeto, setProjeto] = useState({
        nome: '',
        descricao: '',
        responsavel: '',
        dataInicio: '',
        duracao: '',
        imagem: ''
    });

    useEffect(() => {
        if (typeof window !== "undefined" && id) {
            const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
            const projetoEncontrado = projetos.find(item => item.id === String(id)); 
            if (projetoEncontrado) {
                setProjeto(projetoEncontrado);
            } else {
                alert('Projeto não encontrado');
                route.push('/projetos');
            }
        }
    }, [id, route]);

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('O nome do projeto é obrigatório.'),
        descricao: Yup.string().required('A descrição é obrigatória.'),
        responsavel: Yup.string().required('O responsável é obrigatório.'),
        dataInicio: Yup.date().required('A data de início é obrigatória.'),
        duracao: Yup.number().required('A duração é obrigatória.').min(1, 'A duração deve ser pelo menos 1 mês.'),
        imagem: Yup.string().url('A imagem deve ser uma URL válida.').required('A imagem do projeto é obrigatória.')
    });

    function salvar(dados) {
        const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
        const index = projetos.findIndex(item => item.id === String(id)); 

        if (index !== -1) {
            // Se o projeto já existe, atualize suas informações
            projetos[index] = { ...projetos[index], ...dados };
        } else {
            // Se não existir, crie um novo projeto
            dados.id = v4();
            projetos.push(dados);
        }

        localStorage.setItem('projetos', JSON.stringify(projetos));
        route.push('/projetos');
    }

    return (
        <Pagina titulo="Cadastro de Projeto de Voluntariado">
            <Formik
                initialValues={projeto}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome do Projeto</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                                isInvalid={!!errors.nome}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nome}
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                {errors.descricao}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="responsavel">
                            <Form.Label>Responsável</Form.Label>
                            <Form.Control
                                type="text"
                                name="responsavel"
                                value={values.responsavel}
                                onChange={handleChange}
                                isInvalid={!!errors.responsavel}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.responsavel}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dataInicio">
                            <Form.Label>Data de Início</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataInicio"
                                value={values.dataInicio}
                                onChange={handleChange}
                                isInvalid={!!errors.dataInicio}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dataInicio}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="duracao">
                            <Form.Label>Duração (meses)</Form.Label>
                            <Form.Control
                                type="number"
                                name="duracao"
                                value={values.duracao}
                                onChange={handleChange}
                                isInvalid={!!errors.duracao}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.duracao}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imagem">
                            <Form.Label>Imagem do Projeto</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem"
                                value={values.imagem}
                                onChange={handleChange}
                                placeholder="URL da imagem do projeto"
                                isInvalid={!!errors.imagem}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagem}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/projetos" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
