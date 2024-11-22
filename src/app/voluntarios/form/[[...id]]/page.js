'use client';

import React, { useState, useEffect } from "react";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function Page() {
    const route = useRouter();
    const { id } = useParams();

    const [voluntario, setVoluntario] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        tipoProjeto: '',
        disponibilidade: '',
        areasAcao: ''
    });

    const [projetos, setProjetos] = useState([]);
    const [areasDeAcao, setAreasDeAcao] = useState([]);
    const [disponibilidades, setDisponibilidades] = useState([]);

    useEffect(() => {
        const projetosCadastrados = JSON.parse(localStorage.getItem('tipos')) || [];
        setProjetos(projetosCadastrados);

        const areasCadastradas = JSON.parse(localStorage.getItem('areasDeAcao')) || [];
        setAreasDeAcao(areasCadastradas);

        if (!localStorage.getItem('disponibilidades')) {
            const opcoesDisponibilidades = ["Manhã", "Tarde", "Noite", "Finais de Semana", "Período Integral"];
            localStorage.setItem('disponibilidades', JSON.stringify(opcoesDisponibilidades));
        }
        setDisponibilidades(JSON.parse(localStorage.getItem('disponibilidades')));

        // Carregar dados do voluntário se o ID estiver presente
        if (id) {
            const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
            const voluntariosList = voluntarios.find(item => item.id === String(id));
            if (voluntariosList) {
                setVoluntario(voluntariosList);
            } else {
                alert('Voluntário não encontrado');
                route.push('/voluntarios');
            }
        }
    }, [id, route]);

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório.'),
        email: Yup.string().email('Email inválido').required('O email é obrigatório.'),
        telefone: Yup.string().required('O telefone é obrigatório.'),
        cpf: Yup.string().required('O CPF é obrigatório.'),
        tipos: Yup.string().required('O tipo de projeto é obrigatório.'),
        disponibilidade: Yup.string().required('A disponibilidade é obrigatória.'),
        areasAcao: Yup.string().required('A área de ação é obrigatória.')
    });

    function salvar(dados) {
        
        const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];

        if (id) {
            const index = voluntarios.findIndex(item => item.id === String(id));
        
            if (index !== -1) {
            // Se o voluntário já existe, atualize suas informações
            voluntarios[index] = { ...voluntarios[index], ...dados }; // Atualiza o voluntário existente
            }
        } else {
            
            dados.id = v4();
            voluntarios.push(dados);
        }
    
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
        route.push('/voluntarios'); // Redireciona após salvar
    }

    return (
        <Pagina titulo="Cadastro de Voluntário">
            <Formik
                initialValues={voluntario}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                }) => {

                    console.log(errors);
                    
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
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
    
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(e) => setFieldValue("telefone", mask(e.target.value, "(99) 99999-9999"))}
                                    isInvalid={!!errors.telefone}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="cpf">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    value={values.cpf}
                                    onChange={(e) => setFieldValue("cpf", mask(e.target.value, "999.999.999-99"))}
                                    isInvalid={!!errors.cpf}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cpf}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="tipos">
                                <Form.Label>Tipo de Projeto</Form.Label>
                                <Form.Select
                                    name="tipos"
                                    value={values.tipos}
                                    onChange={handleChange}
                                    isInvalid={!!errors.tipos}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {projetos.map((projeto) => (
                                        <option key={projeto.id} value={projeto.nome}>
                                            {projeto.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.tipoProjeto}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="disponibilidade">
                                <Form.Label>Disponibilidade</Form.Label>
                                <Form.Select
                                    name="disponibilidade"
                                    value={values.disponibilidade}
                                    onChange={handleChange}
                                    isInvalid={!!errors.disponibilidade}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {disponibilidades.map((disponibilidade, index) => (
                                        <option key={index} value={disponibilidade}>
                                            {disponibilidade}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.disponibilidade}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="areasAcao">
                                <Form.Label>Área de Ação</Form.Label>
                                <Form.Select
                                    name="areasAcao"
                                    value={values.areasAcao}
                                    onChange={handleChange}
                                    isInvalid={!!errors.areasAcao}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {areasDeAcao.map((area) => (
                                        <option key={area.id} value={area.nome}>
                                            {area.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.areasAcao}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <div className="text-center">
                             <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/voluntarios" className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                } }
            </Formik>
        </Pagina>
    );
}
