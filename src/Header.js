import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CgProfile } from "react-icons/cg";
import "./Header.css";


const Header=({isTransparent,setProfileSectionVisibility})=>{
    return(
        <section className={isTransparent==true ? "header-transparent":"header-opaque"}>
            <Navbar  className="nav-bar " bg="" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to ="/">e-Hotel</Navbar.Brand>
                    <Nav className="nav-menu">
                        {/*<Nav.Link as={Link} to ="/rooms">Rooms</Nav.Link>*/}
                        <Nav.Link onClick={()=>setProfileSectionVisibility(true)}>Sign in <CgProfile size={30} color="white"/></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </section>
    )
}

export default Header;