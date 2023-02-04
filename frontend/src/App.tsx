import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLink, faHammer } from "@fortawesome/free-solid-svg-icons";
import UserPage from "./components/user-page/UserPage";

function App() {
    const menuItems = [
        {
            name: (
                <div className="menu-row">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="bi me-2 menu-icon"
                    />{" "}
                    User
                </div>
            ),
            id: "user",
        },
        {
            name: (
                <div className="menu-row">
                    <FontAwesomeIcon
                        icon={faLink}
                        className="bi me-2 menu-icon"
                    />{" "}
                    Links
                </div>
            ),
            id: "links",
        },
        {
            name: (
                <div className="menu-row">
                    <FontAwesomeIcon
                        icon={faHammer}
                        className="bi me-2 menu-icon"
                    />{" "}
                    Admin
                </div>
            ),
            id: "admin",
        },
    ];
    const [page, setPage] = useState("user");

    return (
        <div className="app">
            <Menu items={menuItems} active={page} onSelect={setPage} />
            <UserPage />
        </div>
    );
}

export default App;
