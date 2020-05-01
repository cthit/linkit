import React, { useState, useEffect } from "react";
import { DigitList } from "@cthit/react-digit-components";
import LinkItem from "./linkitem";

export const LinkList = props => {
    const { getLinks } = props;
    const [links, setLinks] = useState([]);
    const onDelete = item => {
        console.log(item);
    };

    useEffect(() => {
        getLinks().then(links => setLinks(links.data));
    }, []);
    return (
        <DigitList
            title={`Your Shortcuts (${links.length}):`}
            items={links.map(link => LinkItem(link, onDelete))}
            multipleExpanded={false}
            alignSelf={"auto"}
            size={true}
        />
    );
};
