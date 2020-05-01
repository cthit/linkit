import React, { useState, useEffect } from "react";
import LinkList from "../common/linklist";
import { getMyLinks } from "../../services/data.service";

const Home = () => <LinkList getLinks={getMyLinks} />;
export default Home;
