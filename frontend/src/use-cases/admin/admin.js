import React, { useState, useEffect } from "react";
import LinkList from "../common/linklist";
import { getAllLinks, deleteLink } from "../../services/data.service";

const Admin = () => {
    const [links, setLinks] = useState([]);

    const style = {
        flex: 1,
        paddingTop: "10px",
        paddingLeft: "10%",
        paddingRight: "10%",
    };

    const _deleteLink = name => {
        const sure = window.confirm("Are you sure?");
        if (!sure) return;
        deleteLink(name).then(() => {
            setLinks(links.filter(link => link.shortcut !== name));
        });
    };

    useEffect(() => {
        getAllLinks().then(links => setLinks(links.data));
    }, []);
    return (
        <div style={style}>
            <LinkList admin={true} links={links} onDelete={_deleteLink} />
        </div>
    );
};
export default Admin;
