import React, { useState, useEffect } from "react";
import "./home.css";
import { getMyLinks } from "../../services/data.service";

const Home = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        getMyLinks().then(links => setLinks(links.data));
    }, []);
    console.log(links);
    return (
        <ul>
            {links.map(l => (
                <li>{l.shortcut}</li>
            ))}
        </ul>
    );
};

export default Home;
