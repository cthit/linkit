import React, { useState, useEffect } from "react";
import { DigitHeader } from "@cthit/react-digit-components";

const LinkITHeader = ({ renderMain }) => {
    return (
        <DigitHeader
            renderMain={renderMain}
            title="LinkIT"
            renderHeader={() => "header"}
        />
    );
};

export default LinkITHeader;
