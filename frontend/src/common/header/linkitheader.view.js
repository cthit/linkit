import React, { useState, useEffect } from "react";
import {
    DigitHeader,
    DigitGammaActionsDummy,
} from "@cthit/react-digit-components";
import { getUser } from "../../services/data.service";

const LinkITHeader = ({ renderMain }) => {
    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        getUser().then(user => {
            setUser(user.data.nick);
            setIsAdmin(user.data.isAdmin);
        });
    }, []);
    return (
        <DigitHeader
            renderMain={renderMain}
            title="LinkIT"
            renderHeader={() => "Logged in as: " + user}
        />
    );
};

export default LinkITHeader;
