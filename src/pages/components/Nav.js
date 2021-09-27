import React from "react";

import HomeIcon from "./NavUser";
import NavBtns from "./NavBtns";
import NavContact from "./NavContact";

// Won't rerender unless username changes
const Nav = ({ username }) => {
    return (
        <div id='navBar'>
            <HomeIcon username={ username }/>
            <NavBtns/>
            <NavContact/>
        </div>
    );
};

export default React.memo(Nav);