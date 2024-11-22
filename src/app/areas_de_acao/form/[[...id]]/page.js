'use client';

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import React from 'react';

export default function Page({ params }) {
    const route = useRouter();
    const areas = JSON.parse(localStorage.getItem('areasDeAcao')) || [];

  
    const { id } = React.use(params); 

    // Busca a área de ação com base no ID
    const dados = areas.find(item => item.id === String(id)); 
    const area = dados || { nome: '', descricao: '' };

    function salvar(dados) {
        const index = areas.findIndex(item => item.id === String(id)); 

        if (index !== -1) {
            // Se a área já existe, atualize suas informações
            areas[index] = { ...areas[index], ...dados };
        } else {
            // Se não existir, crie uma nova área
            dados.id = v4();
            areas.push(dados);
        }

        localStorage.setItem('areasDeAcao', JSON.stringify(areas));
        return route.push('/areas_de_acao'); 
    }

    return (
        <Pagina titulo="Cadastro de Área de Ação">
            <Formik
                initialValues={area}
                onSubmit={values => salvar(values)}
            >
                {({ 
                    values, 
                    handleChange, 
                    handleSubmit 
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange("nome")}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descricao"
                                value={values.descricao}
                                onChange={handleChange('descricao')}
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/areas_de_acao" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
