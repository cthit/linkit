import React, { useState, useEffect } from "react";
import { DigitList } from "@cthit/react-digit-components";
import LinkItem from "./linkitem.component";

export const LinkList = props => {
    const { links, onDelete } = props;
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
