'use client';

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const dados = tipos.find(item => item.id == params.id);
    const tipo = dados || { nome: '', descricao: '' };

    function salvar(dados) {
        if (tipo.id) {
            Object.assign(tipo, dados);
        } else {
            dados.id = v4();
            tipos.push(dados);
        }

        localStorage.setItem('tipos', JSON.stringify(tipos));
        return route.push('/tipo_projetos');
    }

    return (
        <Pagina titulo="Cadastro de Tipo de Projeto">
            <Formik
                initialValues={tipo}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                name="descricao"
                                value={values.descricao}
                                onChange={handleChange('descricao')}
                                required
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/tipo_projetos"
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
