import { Container, Nav, Navbar, Row, Col, Carousel, Button } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaHeart } from "react-icons/fa";

export default function Pagina(props) {
    return (
        <>
            <Navbar style={{ backgroundColor: '#000080', padding: '15px', borderRadius: '8px' }}>
                <Container>
                    <Navbar.Brand href="/">
                        <Image 
                            src="/images/juntos-logo.jpeg"
                            alt="Logo Voluntariado" 
                            width={60}  
                            height={60}
                            style={{borderRadius: '8px'}}
                            
                        />
                    </Navbar.Brand>
                    <Nav style={{ fontSize: '1.1rem', gap: '30px', margin: 'auto' }}>
                        <Nav.Link href="/projetos" className="nav-link-custom">Projetos</Nav.Link>
                        <Nav.Link href="/voluntarios" className="nav-link-custom">Cadastro de Voluntários</Nav.Link>
                        <Nav.Link href="/eventos" className="nav-link-custom">Eventos e Encontros</Nav.Link>
                        <Nav.Link href="/areas_de_acao" className="nav-link-custom">Áreas de Ação</Nav.Link>
                        <Nav.Link href="/tipo_projetos" className="nav-link-custom">Tipos de Projetos</Nav.Link>
                        <Nav.Link href="/doacoes" className="nav-link-custom">Nossas Doações</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Cabecalho 
                titulo={props.titulo} 
                subtitulo="Juntos por um mundo melhor" 
            />

            <Container className="my-3" style={{ 
                backgroundColor: '#5F9EA0', 
                padding: '20px',
                borderRadius: '8px' }}>
                
                {props.children}
            </Container>

            {/* Rodapé */}
            <footer className="fade-in" style={{ backgroundColor: '#000080', color: '#FFF8E1', padding: '30px 0', marginTop: '40px' }}>
                <Container>
                    <Row className="text-center text-md-left">
                        <Col md={4} className="mb-4">
                            <h5>Voluntariado</h5>
                            <p>Junte-se a nós e faça a diferença na vida de quem mais precisa. Seu tempo e dedicação são as maiores riquezas que podemos compartilhar.</p>
                        </Col>
                        <Col md={4} className="mb-4">
                            <h5>Links Rápidos</h5>
                            <Nav className="flex-column">
                                <Nav.Link href="/projetos" className="footer-link">Projetos</Nav.Link>
                                <Nav.Link href="/voluntarios" className="footer-link">Cadastro de Voluntários</Nav.Link>
                                <Nav.Link href="/eventos" className="footer-link">Eventos e Encontros</Nav.Link>
                                <Nav.Link href="/areas_de_acao" className="footer-link">Áreas de Ação</Nav.Link>
                                <Nav.Link href="/tipo_projetos" className="footer-link">Tipos de Projetos</Nav.Link>
                                <Nav.Link href="/doacoes" className="footer-link">Doacoes</Nav.Link>
                            </Nav>
                        </Col>
                        <Col md={4} className="mb-4">
                            <h5>Contato</h5>
                            <p>Email: contato@voluntariado.com</p>
                            <p>Telefone: (61) 98385-5619</p>
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaFacebookF /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaInstagram /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaTwitter /></a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaLinkedinIn /></a>
                            </div>
                        </Col>
                    </Row>
                    <hr style={{ borderColor: '#FFF8E1' }} />
                    <Row>
                        <Col className="text-center">
                            <p className="mb-0">© {new Date().getFullYear()} Voluntariado. Todos os direitos reservados.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* Botão de Doação Pulsante */}
            <a href="/doacoes" className="donate-button">
                <FaHeart />
            </a>

            {/* Estilos adicionais para o botão de doação e animações */}
            <style>{`
                .nav-link-custom, .footer-link {
                    color: #FFF8E1;
                    transition: color 0.3s ease;
                    text-decoration: none;
                }
                .nav-link-custom:hover, .footer-link:hover {
                    color: #FFD700;
                }

                /* Estilos do botão de doação */
                .donate-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #FF6347;
                    color: white;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    text-decoration: none;
                    animation: pulse 2s infinite;
                    z-index: 1000;
                }

                .donate-button:hover {
                    background-color: #FF4500;
                }

                /* Animação de pulsação */
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </>
    );
}
