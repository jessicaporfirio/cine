'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // Carregar as áreas de ação do localStorage ao iniciar a página
        const areasSalvas = JSON.parse(localStorage.getItem('areasDeAcao')) || [];
        setAreas(areasSalvas);
    }, []);

    function excluir(id) {
        if (confirm("Deseja realmente excluir o registro?")) {
            const dados = areas.filter(item => item.id !== id);
            localStorage.setItem('areasDeAcao', JSON.stringify(dados)); // Corrige o nome do localStorage para 'areasDeAcao'
            setAreas(dados);
        }
    }

    return (
        <Pagina titulo="Cadastro de Áreas de Ação"> {/* Corrigido o título para 'titulo' */}
            <Link href="/areas_de_acao/form" className="btn btn-primary mb-3">
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
                    {areas.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/areas_de_acao/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger ms-2"
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
