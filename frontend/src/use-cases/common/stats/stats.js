import React, { useState, useEffect } from "react";
import { DigitDisplayData, useGammaMe } from "@cthit/react-digit-components";

const Stats = (item, close) => {
    console.log(item);
    return (
        <DigitDisplayData
            data={{
                link: item.item.shortcut,
                destination: (
                    <a href={item.item.linkurl}>{item.item.linkurl}</a>
                ),
                creator: item.item.creatorUID ? item.item.creatorUID : "You",
            }}
            keysText={{
                link: "Link",
                destination: "Destination",
                creator: "Creator",
            }}
            keysOrder={["link", "destination", "creator"]}
        />
    );
};
export default Stats;
