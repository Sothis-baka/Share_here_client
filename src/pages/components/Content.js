import React from "react";

import ContentPostInput from "./ContentPostInput";
import ContentPostArea from "./ContentPostArea";

const Content = ({ username }) => {
    return (
        <div id='mainContent'>
            <ContentPostInput/>
            <ContentPostArea username={ username }/>
        </div>
    );
}

export default React.memo(Content);