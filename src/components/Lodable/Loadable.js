import React, { Suspense } from "react";

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen w-screen bg-white z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

  return React.memo(LoadableComponent);
};

export default Loadable;
