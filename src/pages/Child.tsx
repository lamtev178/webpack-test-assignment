import React from "react";
const ChildApp = React.lazy(() => import("child/App"));

export default function Child() {
  return (
    <React.Suspense fallback="Loading app">
      <ChildApp />
    </React.Suspense>
  );
}
