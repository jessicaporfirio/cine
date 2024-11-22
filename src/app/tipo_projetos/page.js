'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        setTipos(JSON.parse(localStorage.getItem('tipos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = tipos.filter(item => item.id !== id);
            localStorage.setItem('tipos', JSON.stringify(dados));
            setTipos(dados);
        }
    }

    return (
        <Pagina titulo="Tipos de Projetos">
            <Link href="/tipo_projetos/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {tipos.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/tipo_projetos/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
