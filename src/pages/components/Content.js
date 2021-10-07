import React from "react";

import ContentPostInput from "./ContentPostInput";
import ContentPostArea from "./ContentPostArea";

const Content = () => {
    return (
        <div id='mainContent'>
            <ContentPostInput/>
            <ContentPostArea/>
        </div>
    );
};

export default React.memo(Content);