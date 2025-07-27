import React from "react";
import '../App.css'

// Higher-Order Component checking response status
function WithCheckingStatus(Component) {
  return function WrappedComponent({ responseIsCorrect, errorText, ...props }) {
    if (!responseIsCorrect) {
      return <div className="withError">{errorText}</div>;
    }
    return <Component {...props} />;
  };
}

export default WithCheckingStatus;