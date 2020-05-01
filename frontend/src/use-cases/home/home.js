import React, { useState, useEffect } from "react";
import LinkList from "../common/linklist";
import { getMyLinks, postLink, deleteLink } from "../../services/data.service";
import { AddLink } from "./views/addlink/addlink.view";

const Home = () => {
    const [links, setLinks] = useState([]);

    const addLink = link => {
        postLink(link).then(response => {
            // Make sure no duplicates
            const newLinks = links.filter(
                link => link.shortcut !== response.data.shortcut
            );
            setLinks([...newLinks, response.data]);
        });
    };

    const _deleteLink = name => {
        const sure = window.confirm("Are you sure?");
        if (!sure) return;
        deleteLink(name).then(() => {
            setLinks(links.filter(link => link.shortcut !== name));
        });
    };

    useEffect(() => {
        getMyLinks().then(links => setLinks(links.data));
    }, []);
    return (
        <div>
            <AddLink addLink={addLink} />
            <LinkList links={links} onDelete={_deleteLink} />
        </div>
    );
};
export default Home;
