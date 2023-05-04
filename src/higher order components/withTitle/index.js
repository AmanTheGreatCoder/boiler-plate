import React, { useEffect } from "react";

function withTitle(WrappedComponent, title) {
    return function ComponentWithDocumentTitle(props) {
        useEffect(() => {
            document.title = title;
        }, []);

        return <WrappedComponent {...props} />;
    };
}

export default withTitle;