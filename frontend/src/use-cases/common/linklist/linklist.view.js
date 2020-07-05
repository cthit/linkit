import React, { useState, useEffect } from "react";
import { DigitList, useDigitCustomDialog } from "@cthit/react-digit-components";
import LinkItem from "./linkitem.component";
import Stats from "../stats";

export const LinkList = props => {
    const { links, onDelete } = props;
    const [openDialog] = useDigitCustomDialog({ title: "Statistics" });
    return (
        <DigitList
            title={`Your Shortcuts (${links.length}):`}
            items={links.map(link => LinkItem(link, onDelete))}
            multipleExpanded={false}
            alignSelf={"auto"}
            size={true}
            onClick={item =>
                openDialog({
                    renderMain: () => <Stats item={item.link} />,
                })
            }
        />
    );
};
