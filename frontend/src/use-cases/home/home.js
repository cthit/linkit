import React, { useState, useEffect } from "react";
import LinkList from "../common/linklist";
import { getMyLinks } from "../../services/data.service";
import { AddLink } from "./views/addlink/addlink.view";

const Home = () => (
    <div>
        <AddLink></AddLink>
        <LinkList getLinks={getMyLinks} />
    </div>
);
export default Home;
