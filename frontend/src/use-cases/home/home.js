import React, { useState, useEffect } from "react";
import "./home.css";
import { getMyLinks } from "../../services/data.service";
import { DigitList } from "@cthit/react-digit-components";
import LinkItem from "./linkitem";

const Home = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        getMyLinks().then(links => setLinks(links.data));
    }, []);
    return (
        <DigitList
            title={`Your Shortcuts (${links.length})`}
            items={links.map(link => LinkItem(link))}
            multipleExpanded={false}
            alignSelf={"auto"}
            size={true}
        />
    );
};

export default Home;
