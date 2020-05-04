import React, { useState, useEffect } from "react";
import {
    DigitHeader,
    DigitGammaActionsDummy,
} from "@cthit/react-digit-components";
import { getUser } from "../../services/data.service";

const LinkITHeader = ({ renderMain }) => {
    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    useEffect(() => {
        getUser().then(user => {
            setUser(user.data.nick);
            setIsAdmin(user.data.isAdmin);
            setAvatarUrl(user.data.avatarUrl);
        });
    }, []);
    return (
        <DigitHeader
            renderMain={renderMain}
            title="LinkIT"
            headerRowProps={{
                flex: "1",
                justifyContent: "space-between",
            }}
            renderHeader={() => (
                <DigitGammaActionsDummy
                    nick={user}
                    avatarUrl={avatarUrl}
                ></DigitGammaActionsDummy>
            )}
        />
    );
};

export default LinkITHeader;
