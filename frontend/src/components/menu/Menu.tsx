import "./Menu.css";
import Nav from "react-bootstrap/Nav";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    items: { id: string; name: any }[];
    active: string;
    onSelect: any;
}

function Menu(props: IProps) {
    return (
        <div className="h-100 bg-dark menu">
            <a
                href="#"
                className="text-white text-center m-1 text-decoration-none"
                style={{ fontSize: "30px" }}
            >
                <FontAwesomeIcon icon={faLink} className="bi me-2" /> LinkIT
            </a>
            <hr className="menu-divider" />
            <Nav
                className="flex-column bg-dark p-3 mb-auto"
                defaultActiveKey={props.active}
                onSelect={props.onSelect}
                variant="pills"
            >
                {props.items.map(item => (
                    <Nav.Item key={item.id}>
                        <Nav.Link className="text-white" eventKey={item.id}>
                            {item.name}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
}

export default Menu;
