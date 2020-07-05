import React, { useState, useEffect } from "react";
import {
    DigitDisplayData,
    useGammaMe,
    DigitText,
} from "@cthit/react-digit-components";

const Stats = (item, close) => {
    console.log(item);
    return (
        <div>
            <DigitText.Title text={item.item.shortcut} alignCenter />
            <DigitText.Heading4 text={item.item.shortcut} />
        </div>
    );
};
export default Stats;
