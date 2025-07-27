import React from "react";

// Higher-Order Component
function WithLoading(Component) {
  return function WrappedComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

export default WithLoading;