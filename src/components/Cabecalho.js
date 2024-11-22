export default function Cabecalho(props) {
    return (
        <div className="cabecalho-container text-center py-4">
            <h1 className="cabecalho-titulo text-success">{props.titulo}</h1>
            <p className="cabecalho-subtitulo text-muted">{props.subtitulo}</p>
        </div>
    );
}
