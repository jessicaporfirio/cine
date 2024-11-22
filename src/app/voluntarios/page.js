'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [voluntarios, setVoluntarios] = useState([]);

    useEffect(() => {
        const voluntariosList = JSON.parse(localStorage.getItem('voluntarios')) || [];
        setVoluntarios(voluntariosList);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = voluntarios.filter(item => item.id !== id);
            localStorage.setItem('voluntarios', JSON.stringify(dados));
            setVoluntarios(dados);
        }
    }

    return (
        <Pagina titulo="Voluntários">
            <Link href="/voluntarios/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>CPF</th>
                        <th>Tipo de Projeto</th>
                        <th>Disponibilidade</th>
                        <th>Área de Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {voluntarios.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <>
                                    <Link href={`/voluntarios/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />
                                </>
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.cpf}</td>
                            <td>{item.tipoProjeto}</td>
                            <td>{item.disponibilidade}</td>
                            <td>{item.areasAcao || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
